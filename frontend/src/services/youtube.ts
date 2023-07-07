import { YOUTUBE_API_KEY } from "../utils";

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
