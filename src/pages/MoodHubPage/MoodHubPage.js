import { useEffect } from "react";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import Navigation from "../../components/Navigation/Navigation";
import BurnOutSigns from "../../components/BurnOutSigns/BurnOutSigns";
import BurnOutCauses from "../../components/BurnOutCauses/BurnOutCauses";
import BurnOutManagement from "../../components/BurnOutManagement/BurnOutManagement";
import BurnOutResources from "../../components/BurnOutResources/BurnOutResources";
import "./MoodHubPage.scss";

export default function MoodHubPage({ isLoggedIn, handleLogout, darkTheme, handleTheme }) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {!isLoggedIn && <LogInMessage />}
      {isLoggedIn && (
        <>
          <Navigation
            handleLogout={handleLogout}
            darkTheme={darkTheme}
            handleTheme={handleTheme}
          />
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
              <BurnOutCauses darkTheme={darkTheme} />
              <BurnOutSigns darkTheme={darkTheme} />
              <BurnOutManagement darkTheme={darkTheme} />
              <BurnOutResources darkTheme={darkTheme} />
            </div>
          </main>
        </>
      )}
    </>
  );
}
