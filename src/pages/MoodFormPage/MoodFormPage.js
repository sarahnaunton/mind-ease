import { useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import Navigation from "../../components/Navigation/Navigation";
import MoodForm from "../../components/MoodForm/MoodForm";
import thinking from "../../assets/icons/thinking.png";
import "./MoodFormPage.scss";

export default function MoodFormPage() {
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
          <main className={`mood-page ${darkTheme ? "mood-page--dark" : ""}`}>
            <div className="mood-page__container">
              <h1 className={`mood-page__heading ${
                    darkTheme ? "mood-page__heading--dark" : ""
                  }`}>How are you feeling today?</h1>
              <div className={`mood-page__introduction ${
                    darkTheme ? "mood-page__introduction--dark" : ""
                  }`}>
                <h2
                  className={`mood-page__subheading ${
                    darkTheme ? "mood-page__subheading--dark" : ""
                  }`}
                >
                  Your understanding of your mental wellbeing is essential for
                  taking steps towards improvement. <img src={thinking} alt="Thinking emoji" className="mood-page__icon" />
                </h2>
                <h3
                  className={`mood-page__subheading ${
                    darkTheme ? "mood-page__subheading--dark" : ""
                  }`}
                >
                  Continue your empowering journey by completing the
                  questionnaire below.
                </h3>
              </div>
              <p
                className={`mood-page__text ${
                  darkTheme ? "mood-page__text--dark" : ""
                }`}
              >
                Please carefully consider and respond to each question based on
                your experiences and feelings in your current work situation.
              </p>
              <MoodForm />
            </div>
          </main>
        </>
      )}
    </>
  );
}
