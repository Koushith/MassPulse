//@ts-nocheck
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { useEffect } from "react";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useAuth();

  return (
    <div>
      <h1>Profile</h1>

      <div>
        <h1>{userInfo?.displayName}</h1>
        <h1>{userInfo.email}</h1>

        <img src={userInfo?.photoURL} alt="avatar" />
      </div>
    </div>
  );
};
