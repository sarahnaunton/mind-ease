import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import LogInMessage from "../components/LogInMessage/LogInMessage";
import Navigation from "../components/Navigation/Navigation";
import BurnOutSigns from "../components/BurnOutSigns/BurnOutSigns";
import BurnOutCauses from "../components/BurnOutCauses/BurnOutCauses";
import BurnOutManagement from "../components/BurnOutManagement/BurnOutManagement";
import BurnOutResources from "../components/BurnOutResources/BurnOutResources";
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
              <div
                className={`page__text ${darkTheme ? "page__text--dark" : ""}`}
              >
                <p>
                  Burnout is the result of prolonged pressure from work, leading
                  to complete mental, physical, and emotional exhaustion. <img src={sad} alt="Sad Emoji" className="page__icon"/>
                </p>
              </div>
              <BurnOutCauses />
              <BurnOutSigns />
              <BurnOutManagement />
              <BurnOutResources />
            </div>
          </main>
        </>
      )}
    </>
  );
}
