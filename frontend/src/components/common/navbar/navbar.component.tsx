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
    setUserInfo(null);
    setIsLoggedIn(false);
  };
  return (
    <Container>
      <StyledNavbar>
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
