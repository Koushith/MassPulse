import { createContext, useContext, useState } from "react";

export const VideoContext = createContext({});

export const VideoProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const value = { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo };
  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);
