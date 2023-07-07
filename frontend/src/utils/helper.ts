// export const extractYouTubeVideoId = (link: string) => {
//     const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
//     const match = link.match(regex);

//     if (match && match[1]) {
//         return match[1];
//     }

//     return null;
// };

export const extractYouTubeVideoId = (link: string) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})|(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/;
  const match = link.match(regex);

  if (match) {
    return match[1] || match[2] || null;
  }

  return null;
};
