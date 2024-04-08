import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import Navigation from "../../components/Navigation/Navigation";
import MoodForm from "../../components/MoodForm/MoodForm";
import "./MoodFormPage.scss";

export default function MoodFormPage({ setIsLoggedIn, isLoggedIn }) {
  const navigate = useNavigate();
  const [darkTheme, setDarkTheme] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  const handleTheme = () => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
    localStorage.setItem("theme", JSON.stringify(!darkTheme));
  };

  useEffect(() => {
    const themeJSON = localStorage.getItem("theme");
    if (themeJSON) {
      setDarkTheme(JSON.parse(themeJSON));
    }
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
