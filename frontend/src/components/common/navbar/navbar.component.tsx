import { Button } from "@cred/neopop-web/lib/components";
import { Container } from "../container/container.component";
import { StyledNavbar } from "./navbar.styles";
import { StyledButton } from "../../hero/hero.styles";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserDocumentFromAuth,
  createUserWithCredentials,
  signInWithGooglePopup,
  signOutUser,
} from "../../../utils/firebase";
import { useAuth } from "../../../context";
import { Toaster, toast } from "react-hot-toast";

export const NavBar = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserInfo, userInfo, isLoggedIn } = useAuth();

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();

    if (user) {
      setIsLoggedIn(true);
      setUserInfo({ ...user });
      console.log(isLoggedIn);
    }
    // await createUserDocumentFromAuth(user);

    console.log("user info-----------", userInfo);
  };

  const signoutHandler = async () => {
    await signOutUser();
    localStorage.removeItem("userInfo");
    toast.error("Logged Out!");
    setUserInfo(null);
    setIsLoggedIn(false);
    navigate("/");
  };
  return (
    <Container>
      <StyledNavbar>
        <Toaster
          toastOptions={{
            style: {
              border: "1px solid #713200",
              padding: "16px",
              fontSize: "14px",
            },
          }}
        />
        <p className="logo" onClick={() => navigate("/")}>
          Mass.Pulse
        </p>

        <nav>
          <ul>
            <li>
              {" "}
              <Link to="/about">About</Link>
            </li>

            {/* <li>
              {" "}
              <Link to="/pricing">Pricing</Link>
            </li>

            <li>
              {" "}
              <Link to="/profile">Profile</Link>
            </li> */}
            <li>
              {isLoggedIn && (
                <StyledButton
                  style={{
                    background: "transparent",
                    border: "1px solid white",
                  }}
                  onClick={signoutHandler}
                >
                  Sign Out
                </StyledButton>
              )}
            </li>
          </ul>
        </nav>
      </StyledNavbar>
    </Container>
  );
};
