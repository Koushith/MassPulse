import { Container } from "../common/container/container.component";
import {
  HeroComponentStyles,
  StyledButton,
  TypewriterText,
} from "./hero.styles";
import HeroImage from "../../assets/hero.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import {
  createUserDocumentFromAuth,
  persistVideoHistory,
  signInWithGooglePopup,
  updateUserHistory,
} from "../../utils/firebase";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ToastContainer, showToast } from "@cred/neopop-web/lib/components";
import { Toaster, toast } from "react-hot-toast";

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-top: 2px solid #8264f6;
  border-radius: 50%;
  animation: ${spinAnimation} 0.8s linear infinite;
`;

export const HeroSection = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserInfo, userInfo, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);

      const { user } = await signInWithGooglePopup();
      toast.success("Logged In Successfully!");
      if (user) {
        setIsLoggedIn(true);
        setUserInfo({ ...user });
        console.log(isLoggedIn);

        navigate("/suggestions");

        await createUserDocumentFromAuth(user);
      }
    } catch (error) {
      console.log("something went wrong", error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToInsights = () => {
    navigate("/suggestions");
  };

  return (
    <HeroComponentStyles>
      <Toaster />
      <div className="form">
        <h1 className="title">
          Amplify Your YouTube Impact! Leverage audience comments for actionable
          insights
        </h1>

        <div className="action">
          {/* <input onChange={(e) => setVideoID(e.target.value)} value={videoID} /> */}
          {isLoggedIn ? (
            <StyledButton onClick={navigateToInsights}>
              Get Insights
            </StyledButton>
          ) : (
            <StyledButton onClick={signInWithGoogle}>
              {isLoading && <Spinner />}
              Login with Google
            </StyledButton>
          )}

          <div className="creators-list">
            <div className="list">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" />
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlJTIwcG90cmFpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" />
              <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG90cmFpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" />
              <img src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1921&q=80" />
              <img src="https://images.unsplash.com/photo-1546791737-97c81ec08179?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" />
            </div>
            <div>Join other 100+ Creators</div>
          </div>
        </div>
      </div>
      <div className="hero-image">
        <div className="img">
          <img src={HeroImage} alt="hero" />
        </div>
      </div>
    </HeroComponentStyles>
  );
};
