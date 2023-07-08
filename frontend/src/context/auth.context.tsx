import { createContext, useContext, useEffect, useState } from "react";
import { auth, onAuthStateChangedListener } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

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

  const value: AuthContextType = {
    isLoggedIn,
    setIsLoggedIn,
    userInfo,
    setUserInfo,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserInfo(user);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
