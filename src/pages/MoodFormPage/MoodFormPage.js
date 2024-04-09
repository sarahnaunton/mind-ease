import { useEffect } from "react";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import Navigation from "../../components/Navigation/Navigation";
import MoodForm from "../../components/MoodForm/MoodForm";
import "./MoodFormPage.scss";

export default function MoodFormPage({ isLoggedIn, handleLogout, darkTheme, handleTheme }) {

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
          <main className={`mood-page ${darkTheme ? "mood-page--dark" : ""}`}>
            <div className="mood-page__container">
              <h1
                className={`mood-page__heading ${
                  darkTheme ? "mood-page__heading--dark" : ""
                }`}
              >
                Complete the questionnaire below
              </h1>
              <p
                className={`mood-page__text ${
                  darkTheme ? "mood-page__text--dark" : ""
                }`}
              >
                Please carefully consider and respond to each question based on
                your experiences and feelings in your current work situation.
              </p>
              <MoodForm darkTheme={darkTheme} />
            </div>
          </main>
        </>
      )}
    </>
  );
}
