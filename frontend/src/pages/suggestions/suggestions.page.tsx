//@ts-nocheck
import { Configuration, OpenAIApi } from "openai";
import { useEffect, useState } from "react";

import {
  BACKEND_BASE_LOCAL,
  BACKEND_BASE_URL,
  OPEN_AI_API_KEY,
  YOUTUBE_API_KEY,
  extractYouTubeVideoId,
  getAPIURL,
} from "../../utils";
import { StyledButton } from "../../components/hero/hero.styles";
import { HistoryCard, SuggestionsPageContainer } from "./suggestions.styles";
import { useAuth, useVideo } from "../../context";
import { Spinner } from "../../components";
import HeroImage from "../../assets/hero.png";
import { Toaster, toast } from "react-hot-toast";
import { getYouTubeVideoInfo, updateResponseToDB } from "../../services";
import axios from "axios";

export const SuggestionsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoID, setVideoID] = useState("");
  const [isOutputGenerated, setIsOutputGenerated] = useState(false);
  const [history, setHistory] = useState([]);
  const [finalResponse, setFinalResponse] = useState([]);
  const [fromPreviousResponse, setFromPreviousResponse] = useState([]);
  const [historyTitle, setHistoryTitle] = useState("");
  const [isLoaddedOnInitialClick, setIsLoadedOnInitialClick] = useState(false);
  const [hasPreviousResponse, setHasPreviosResponse] = useState(false);

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
      const reqUrl = `${getAPIURL()}/video`;

      console.log("req urllll---posttt-----", reqUrl);
      const record = await axios.post(reqUrl, {
        videoTitle,
        videoLink,
        name,
        email,
        videoId,
      });
    } catch (error) {
      console.log("something went wrong", error.message);
    }
  };

  console.log("emvironment test--------", getAPIURL());

  const fetchSearch = async (id) => {
    try {
      let userID = userInfo?.email;
      const reqUrl = `${getAPIURL()}/video/${userID}`;
      console.log("req url------getttt--------", reqUrl);
      const query = await axios.get(reqUrl);

      setHistory(query.data.videoResults);

      // setHistoryTitle(query.data.query.videoTitle);
    } catch (error) {
      console.log("something went wrong", error.message, error);
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

      setHistory([...history, { title, videoLink }]);
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
            user: comments.snippet?.topLevelComment?.snippet?.authorDisplayName,
            comment: comments?.snippet?.topLevelComment?.snippet?.textOriginal,
          };
        });
        console.log("extracted comments---", extractedComments);
        if (extractedComments?.length > 0) {
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

      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        // prompt: `Following are the comments from a YouTube video:\n\n + ${JSON.stringify(
        //   extractedComments
        // ).slice(
        //   0,
        //   8000
        // )} + \n\n Please provide suggestions to improve the content based on these comments.
        // Include references to the exact comments when giving your suggestions.`,
        //  max_tokens: 1200,
        messages: [
          {
            role: "user",
            content: `Following are the comments from a YouTube video:\n\n + ${JSON.stringify(
              extractedComments
            ).slice(
              0,
              8000
            )} + \n\n Please provide suggestions to improve the content based on these comments.
        Include references to the exact comments when giving your suggestions.`,
          },
        ],
        //max_tokens: 3000,
      });

      const res1 = response.data.choices[0].message?.content;

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

  const fetchPreviousResponse = async (
    videoLink: string,
    videoTitle: string
  ) => {
    try {
      //get comments and set the new
      setHistoryTitle(videoTitle);

      const extractedId = extractYouTubeVideoId(videoLink);

      const { data } = await axios.get(
        `${BACKEND_BASE_URL}/video/search/${extractedId}`
      );

      setFromPreviousResponse(data.video);
      setIsLoadedOnInitialClick(true);
      setHasPreviosResponse(true);
    } catch (e) {
      console.log("couldnt get previous resp", e.message, e);
    }
  };

  const suggestionsFor =
    history.length > 0 ? history[history.length - 1]?.videoTitle : "Video";

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
        {/* start- mob */}
        <div className="response  hide-on-desktop">
          <div>
            {finalResponse?.length > 0 ? (
              <>
                <h1 className="suggestion-title">
                  Suggestions for -{suggestionsFor}
                </h1>
                {finalResponse.map((tip, index) => (
                  <div className="results" key={index}>
                    <ul>
                      <li>{renderString(tip)}</li>
                    </ul>
                  </div>
                ))}

                <div className="previous-responses">
                  <h1 className="title">
                    Previous Responses for - {historyTitle}
                  </h1>

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
                  <p>No Responses Yet!!</p>
                ) : (
                  <div className="loader-text">
                    <Spinner /> Generating...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {/* end */}
        <div className="history">
          <h2>Recent Searches</h2>

          {history?.length > 0 ? (
            <>
              {history?.map((vid: any, id: number) => (
                <HistoryCard
                  className="history-card"
                  onClick={() =>
                    fetchPreviousResponse(vid?.videoLink, vid?.videoTitle)
                  }
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
      <div className="response hide-on-phone">
        <div>
          {finalResponse?.length > 0 ? (
            <>
              <h1 className="suggestion-title">
                Suggestions for -{suggestionsFor}
              </h1>
              {finalResponse.map((tip, index) => (
                <div className="results" key={index}>
                  <ul>
                    <li>{renderString(tip)}</li>
                  </ul>
                </div>
              ))}

              <div className="previous-responses">
                <h1 className="title">
                  Previous Responses for - {historyTitle}
                </h1>

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
            <></>
          )}
        </div>

        {isLoaddedOnInitialClick ? (
          <>
            <div className="previous-responses">
              <h1 className="title">Previous Responses for - {historyTitle}</h1>

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
          <>
            {fromPreviousResponse.length > 0 ? (
              <>
                <div className="previous-responses">
                  <h1 className="title">
                    Previous Responses for - {historyTitle}
                  </h1>

                  {hasPreviousResponse ? (
                    <>
                      {" "}
                      {fromPreviousResponse.map((tip, index) => (
                        <div className="results" key={index}>
                          <ul>
                            <li>{tip}</li>
                          </ul>
                        </div>
                      ))}
                    </>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <div className="no-results">
                  <img src={HeroImage} alt="hero" />

                  {!isOutputGenerated ? (
                    <p>No Responses Yet!!</p>
                  ) : (
                    <div className="loader-text">
                      <Spinner /> Generating...
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </SuggestionsPageContainer>
  );
};
