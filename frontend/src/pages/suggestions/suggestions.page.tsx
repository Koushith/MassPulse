//@ts-nocheck
import { Configuration, OpenAIApi } from "openai";
import { useEffect, useState } from "react";

import {
  BACKEND_BASE_LOCAL,
  BACKEND_BASE_URL,
  OPEN_AI_API_KEY,
  YOUTUBE_API_KEY,
  extractYouTubeVideoId,
} from "../../utils";
import { StyledButton } from "../../components/hero/hero.styles";
import { HistoryCard, SuggestionsPageContainer } from "./suggestions.styles";
import { useAuth, useVideo } from "../../context";
import { Spinner } from "../../components";
import HeroImage from "../../assets/hero.png";
import { Toaster, toast } from "react-hot-toast";
import { getYouTubeVideoInfo } from "../../services";
import axios from "axios";

export const SuggestionsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoID, setVideoID] = useState("");
  const [isOutputGenerated, setIsOutputGenerated] = useState(false);
  const [history, setHistory] = useState([]);
  const [finalResponse, setFinalResponse] = useState([]);
  const [fromPreviousResponse, setFromPreviousResponse] = useState([]);

  const { userInfo } = useAuth();
  console.log(userInfo);

  // console.log("backend base url---- fetching", BACKEND_BASE_URL);

  const addSearchResult = async (
    videoTitle: string,
    videoLink: string,
    name: string,
    email: string,
    videoId: string
  ) => {
    try {
      const reqUrl = `${BACKEND_BASE_URL}/video`;

      console.log("req urllll---posttt-----", reqUrl);
      const record = await axios.post(reqUrl, {
        videoTitle,
        videoLink,
        name,
        email,
        videoId,
      });
      console.log("reord inserted?", record);
    } catch (error) {
      console.log("something went wrong", error.message);
    }
  };

  const fetchSearch = async (id) => {
    try {
      let userID = userInfo?.email;
      const reqUrl = `${BACKEND_BASE_URL}/video/${userID}`;
      console.log("req url------getttt--------", reqUrl);
      const query = await axios.get(reqUrl);
      console.log("queryyyyyyyyyyyyyyyy-------", query.data.videoResults);

      console.log("query", query.data.videoResults);
      setHistory(query.data.videoResults);
    } catch (error) {
      console.log("something went wrong", error.message);
    }
  };

  useEffect(() => {
    fetchSearch();
  }, [videoID]);

  const fetchallComments = async () => {
    try {
      setIsLoading(true);
      const extractedID = extractYouTubeVideoId(videoID);
      console.log(extractedID);
      const data = await fetch(
        `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${extractedID}&maxResults=50&key=${YOUTUBE_API_KEY}`
      );
      const res = await data.json();

      const { title, videoLink } = await getYouTubeVideoInfo(extractedID);
      // setHistory([...history, { title, videoLink }]);
      addSearchResult(
        title,
        videoLink,
        userInfo.displayName,
        userInfo.email,
        extractedID
      );

      if (res?.items?.length > 0) {
        const extractedComments = res.items.map((comments: any) => {
          return {
            comment: comments?.snippet?.topLevelComment.snippet.textOriginal,
          };
        });

        console.log("extracted comments", extractedComments);

        if (extractedComments?.length > 0) {
          console.log("extracted text- if block----", extractedComments);
          fetchFullResponse(extractedComments, extractedID);
        }
      }
    } catch (err: any) {
      console.log("something went wrong...", err.message);
      toast.error("Something went wrong, couldn't generate the response");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFullResponse = async (
    extractedComments: string,
    extractedID: string
  ) => {
    try {
      setIsLoading(true);
      setIsOutputGenerated(true);
      const configuration = new Configuration({
        apiKey: OPEN_AI_API_KEY,
      });

      const openai = new OpenAIApi(configuration);

      const response = await openai.createCompletion({
        model: "text-davinci-003",

        prompt: `Following are the comments from a YouTube video:\n\n + ${JSON.stringify(
          extractedComments
        )} + \n\n Please provide suggestions to improve the content based on these comments.
        Include references to the exact comments when giving your suggestions.`,
        max_tokens: 1200,
      });

      const res1 = response.data.choices[0].text;
      console.log("final response from ai----", res1);
      //@ts-ignore
      setFinalResponse([res1]);

      //update the respone in db
      updateResponseToDB(res1, extractedID);
    } catch (err) {
      console.log("something went wrong----", err);
      toast.error("Something went wrong, couldn't generate the response");
    } finally {
      setIsLoading(false);
      setVideoID("");
      setIsOutputGenerated(false);
    }
  };

  const updateResponseToDB = (response: string, extractedID: string) => {
    try {
      const reqUrl = `${BACKEND_BASE_URL}/video/update`;
      const update = axios.post(reqUrl, {
        videoId: extractedID,
        response: JSON.stringify(response),
      });

      console.log("response updated-----", update);
    } catch (error) {
      console.log("error occured while updating---", error);
    }
  };
  console.log("final response----from state", finalResponse);

  const fetchPreviousResponse = async (videoLink: string) => {
    try {
      //get comments and set the new

      console.log(videoLink);
      const extractedId = extractYouTubeVideoId(videoLink);
      console.log(extractedId, videoID);

      const { data } = await axios.get(
        `${BACKEND_BASE_URL}/video/search/${extractedId}`
      );
      console.log("prev resp ==========-", data);
      setFromPreviousResponse(data.video);
    } catch (e) {
      console.log("couldnt get previous resp", e.message);
    }
  };

  const suggestionsFor: string =
    (history &&
      history.length > 0 &&
      history[history.length - 1]?.videoTitle) ||
    "Video";

  const renderString = (text: string) => {
    const points = text.split(/\d+\./).filter(Boolean);

    return points.map((point, index) => <p key={index}>{point.trim()}</p>);
  };

  const submitHandler = () => {
    fetchallComments();
  };
  return (
    <SuggestionsPageContainer>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "16px",
          },
        }}
      />
      <div className="actions">
        <div className="user">
          <p>Hello, {userInfo?.displayName} 👋</p>
        </div>{" "}
        <div className="form">
          <input
            placeholder="Enter your Video URL"
            onChange={(e) => setVideoID(e.target.value)}
            value={videoID}
          />
          {!isOutputGenerated ? (
            <StyledButton className="insight-btn" onClick={submitHandler}>
              Get Insights
            </StyledButton>
          ) : (
            <StyledButton className="insight-btn" onClick={submitHandler}>
              <Spinner /> Generating...
            </StyledButton>
          )}
        </div>
        <div className="history">
          <h2>Recent Searches</h2>

          {history?.length > 0 ? (
            <>
              {history?.map((vid: any, id: any) => (
                <HistoryCard
                  className="history-card"
                  onClick={() => fetchPreviousResponse(vid?.videoLink)}
                  key={id}
                >
                  <p className="title">{vid?.videoTitle}</p>
                  <p className="link"> {vid?.videoLink}</p>
                </HistoryCard>
              ))}
            </>
          ) : (
            <HistoryCard>
              <p className="title">Your recent search will appear here...</p>
            </HistoryCard>
          )}
        </div>
      </div>
      <div className="response">
        <div>
          {finalResponse.length > 0 ? (
            <>
              <h1 className="suggestion-title">
                Suggestions for - {suggestionsFor}
              </h1>
              {finalResponse.map((tip, index) => (
                <div className="results" key={index}>
                  <ul>
                    <li>{renderString(tip)}</li>
                  </ul>
                </div>
              ))}

              <div className="previous-responses">
                <h1 className="title">Previous Responses</h1>

                {fromPreviousResponse.map((tip, index) => (
                  <div className="results" key={index}>
                    <ul>
                      <li>{tip}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-results">
              <img src={HeroImage} alt="hero" />

              {!isOutputGenerated ? (
                <p>
                  No Responses Yet!! Paste the YouTuble video URL On input field
                </p>
              ) : (
                <div className="loader-text">
                  <Spinner /> Generating...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </SuggestionsPageContainer>
  );
};
