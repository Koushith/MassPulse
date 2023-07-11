export const OPEN_AI_API_KEY = process.env.REACT_APP_OPEN_AI_API_KEY;
export const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
export const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE;
export const BACKEND_BASE_LOCAL = process.env.REACT_APP_BACKEND_LOCAL;
export const APP_ENV = process.env.REACT_APP_NODE_ENV;

// em to px conversion - media queries doesnt respect custom root size. it will pick default one. -> 59em*16 = 944px;
export const TABLET = "max-width: 59em";
export const PHONE = "max-width: 34em";
