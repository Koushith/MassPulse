import axios from "axios";

import { YOUTUBE_API_KEY, getAPIURL } from "../utils";

export const getYouTubeVideoInfo = async (videoId: string) => {
  const apiKey = YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.items.length > 0) {
      const video = data.items[0];
      const title = video.snippet.title;
      const videoLink = `https://www.youtube.com/watch?v=${videoId}`;

      return { title, videoLink };
    } else {
      throw new Error("Video not found");
    }
  } catch (error) {
    console.error("Error retrieving YouTube video information:", error);
    return null;
  }
};

// find the existing response and update it
export const updateResponseToDB = (response: string, extractedID: string) => {
  try {
    const reqUrl = `${getAPIURL()}/video/update`;
    const update = axios.post(reqUrl, {
      videoId: extractedID,
      response: JSON.stringify(response),
    });

    console.log("updated==", update);
  } catch (error) {
    console.log("error occured while updating---", error);
  }
};
