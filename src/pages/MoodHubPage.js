import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import LogInMessage from "../components/LogInMessage/LogInMessage";
import Navigation from "../components/Navigation/Navigation";
import BurnOutSigns from "../components/BurnOut/BurnOutSigns";
import BurnOutCauses from "../components/BurnOut/BurnOutCauses/BurnOutCauses";
import BurnOutManagement from "../components/BurnOut/BurnOutManagement";
import BurnOutResources from "../components/BurnOut/BurnOutResources/BurnOutResources";
import sad from "../assets/icons/sad.png";

export default function MoodHubPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const { darkTheme } = useContext(ThemeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {!isLoggedIn && <LogInMessage />}
      {isLoggedIn && (
        <>
          <Navigation />
          <main className={`page ${darkTheme ? "page--dark" : ""}`}>
            <div className="page__container">
              <h1
                className={`page__heading ${
                  darkTheme ? "page__heading--dark" : ""
                }`}
              >
                What is burnout?
              </h1>
              <p
                className={`page__text ${darkTheme ? "page__text--dark" : ""}`}
              >
                Burnout is the result of prolonged pressure from work, leading
                to complete mental, physical, and emotional exhaustion.{" "}
                <img src={sad} alt="Sad Emoji" className="page__icon" />
              </p>
              <div
                className={`page__information page__information--green ${
                  darkTheme ? "page__information--green--dark" : ""
                }`}
              >
                <BurnOutCauses />
              </div>
              <div
                className={`page__information page__information--blue ${
                  darkTheme ? "page__information--blue--dark" : ""
                }`}
              >
                <BurnOutSigns />
              </div>
              <div
                className={`page__information page__information--orange ${
                  darkTheme ? "page__information--orange--dark" : ""
                }`}
              >
                <BurnOutManagement />
              </div>
              <BurnOutResources />
            </div>
          </main>
        </>
      )}
    </>
  );
}
