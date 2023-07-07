import { InputField, Button, SearchBar } from "@cred/neopop-web/lib/components";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

import {
  OPEN_AI_API_KEY,
  YOUTUBE_API_KEY,
  extractYouTubeVideoId,
} from "../../utils";
import { StyledButton } from "../../components/hero/hero.styles";
import { HistoryCard, SuggestionsPageContainer } from "./suggestions.styles";
import { useAuth } from "../../context";

export const SuggestionsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoID, setVideoID] = useState("");
  const [extractedText, setExtractedText] = useState([]);
  const [finalResponse, setFinalResponse] = useState([]);

  const { userInfo } = useAuth();
  console.log(userInfo);

  const fetchallComments = async () => {
    try {
      setIsLoading(true);
      const extractedID = extractYouTubeVideoId(videoID);
      console.log(extractedID);
      const data = await fetch(
        `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${extractedID}&maxResults=20&key=${YOUTUBE_API_KEY}`
      );
      const res = await data.json();

      if (res.items.length > 0) {
        const extractedComments = res.items.map((comments: any) => {
          return {
            comment: comments?.snippet?.topLevelComment.snippet.textOriginal,
          };
        });

        console.log("extracted comments", extractedComments);

        if (extractedComments.length > 0) {
          console.log("extracted text- if block----", extractedComments);
          fetchFullResponse(extractedComments);
        }
      }
    } catch (err) {
      console.log("something went wrong...", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFullResponse = async (extractedComments: string) => {
    try {
      const configuration = new Configuration({
        apiKey: OPEN_AI_API_KEY,
      });

      const openai = new OpenAIApi(configuration);

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${extractedComments} - Based on the analysis of the comments of my yotube channel, How users are feeling? can you suggest me some improvements and actionable in the content?`,
        max_tokens: 2000,
      });

      const secondResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${response.data.choices[0].text} - add more`,
        max_tokens: 2000,
      });

      // const thirdResponse = await openai.createCompletion({
      //   model: "text-davinci-003",
      //   prompt: `${secondResponse.data.choices[0].text} - add more`,
      //   max_tokens: 2000,
      // });

      console.log(
        "combine---------------------- ",
        response.data.choices[0].text,
        secondResponse.data.choices[0].text
      );

      const res1 = response.data.choices[0].text;
      const res2 = secondResponse.data.choices[0].text;
      // const res3 = thirdResponse.data.choices[0].text;

      console.log("final combined- ", res1, res2);
      //@ts-ignore
      setFinalResponse([res1, res2]);
    } catch (err) {
      console.log("something went wrong----", err);
    }
  };
  console.log("final- ", finalResponse);
  const submitHandler = () => {
    fetchallComments();
  };
  return (
    <SuggestionsPageContainer>
      <div>
        <h1>Hello {userInfo?.displayName}</h1>
      </div>{" "}
      <div className="actions">
        <div className="form">
          <input
            placeholder="Enter your Video URL"
            onChange={(e) => setVideoID(e.target.value)}
            value={videoID}
          />
          <StyledButton className="insight-btn" onClick={submitHandler}>
            Get Insights
          </StyledButton>
        </div>

        <div className="history">
          <h2>History</h2>
          <HistoryCard className="history-card">
            <p className="title">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
              provident?
            </p>
            <p className="link"> http://koushith.com</p>
          </HistoryCard>
          <HistoryCard className="history-card">
            <p className="title">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
              provident?
            </p>
            <p className="link"> http://koushith.com</p>
          </HistoryCard>
          <HistoryCard className="history-card">
            <p className="title">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
              provident?
            </p>
            <p className="link">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
              voluptatum magnam repudiandae nemo deserunt possimus provident
              aperiam rerum laborum enim!
            </p>
          </HistoryCard>
          <HistoryCard className="history-card">
            <p className="title">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
              provident?
            </p>
            <p className="link"> http://koushith.com</p>
          </HistoryCard>
          <HistoryCard className="history-card">
            <p className="title">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
              provident?
            </p>
            <p className="link"> http://koushith.com</p>
          </HistoryCard>
        </div>
      </div>
      <div className="response">
        <p>
          {isLoading ? (
            <h1>Loading</h1>
          ) : (
            <>
              <div>
                {finalResponse.length > 0 ? (
                  <>
                    {finalResponse.map((tip, index) => (
                      <div className="results" key={index}>
                        <ul>
                          <li>{tip}</li>
                        </ul>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="results">
                    <ul>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Alias, totam veniam saepe dolorem fugit error explicabo
                        adipisci eius eaque itaque veritatis quae perferendis
                        tempora sapiente ea cumque, delectus quos voluptatum?
                        adipisci eius eaque itaque veritatis quae perferendis
                        tempora sapiente ea cumque, delectus quos voluptatum?
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Alias, totam veniam saepe dolorem fugit error explicabo
                        adipisci eius eaque itaque veritatis quae perferendis
                        tempora sapiente ea cumque, adipisci eius eaque itaque
                        veritatis quae perferendis tempora sapiente ea cumque,
                        delectus quos voluptatum?delectus quos voluptatum?
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Alias, totam veniam saepe dolorem fugit error explicabo
                        adipisci eius eaque it adipisci eius eaque itaque
                        veritatis quae perferendis tempora sapiente ea cumque,
                        delectus quos voluptatum? adipisci eius eaque itaque
                        veritatis quae perferendis tempora sapiente ea cumque,
                        delectus quos voluptatum?aque veritatis quae perferendis
                        tempora sapiente ea cumque, delectus quos voluptatum?
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Alias, totam veniam saepe dolorem fugit error explicabo
                        adipisci eius eaque itaque veritatis quae perferendis
                        tempora sapiente ea cumque, delectus quos voluptatum?
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Alias, totam veniam saepe dolorem fugit error explicabo
                        adipisci eius eaque itaque veritatis quae perferendis
                        tempora sapiente ea cumque, delectus quos voluptatum?
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </p>
      </div>
    </SuggestionsPageContainer>
  );
};
