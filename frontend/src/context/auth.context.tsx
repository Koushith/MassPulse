import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: object;
  setUserInfo: any;
}

const initialState: AuthContextType = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userInfo: {},
  setUserInfo: () => {},
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  console.log(userInfo, "userinfoooooo");
  const value: AuthContextType = {
    isLoggedIn,
    setIsLoggedIn,
    userInfo,
    setUserInfo,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
