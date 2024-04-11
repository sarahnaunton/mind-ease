import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import Navigation from "../../components/Navigation/Navigation";
import BurnOutSigns from "../../components/BurnOutSigns/BurnOutSigns";
import BurnOutCauses from "../../components/BurnOutCauses/BurnOutCauses";
import BurnOutManagement from "../../components/BurnOutManagement/BurnOutManagement";
import BurnOutResources from "../../components/BurnOutResources/BurnOutResources";
import "./MoodHubPage.scss";

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
          <main className={`hub ${darkTheme ? "hub--dark" : ""}`}>
            <div className="hub__container">
              <h1
                className={`hub__heading ${
                  darkTheme ? "hub__heading--dark" : ""
                }`}
              >
                What is burnout?
              </h1>
              <div
                className={`hub__text ${darkTheme ? "hub__text--dark" : ""}`}
              >
                <p>
                  Burnout is the result of prolonged pressure from work, leading
                  to complete mental, physical, and emotional exhaustion.
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
