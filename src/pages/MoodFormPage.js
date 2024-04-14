import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import LogInMessage from "../components/LogInMessage/LogInMessage";
import Navigation from "../components/Navigation/Navigation";
import MoodForm from "../components/Mood/MoodForm/MoodForm";
import thinking from "../assets/icons/thinking.png";

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
          <main className={`page ${darkTheme ? "page--dark" : ""}`}>
            <div className="page__container">
              <h1
                className={`page__heading ${
                  darkTheme ? "page__heading--dark" : ""
                }`}
              >
                How are you feeling today?
              </h1>
              <section
                className={`page__information page__information--blue ${
                  darkTheme ? "page__information--blue--dark" : ""
                }`}
              >
                <h2
                  className={`page__subheading ${
                    darkTheme ? "page__subheading--dark" : ""
                  }`}
                >
                  Your understanding of your mental wellbeing is essential for
                  taking steps towards improvement.
                </h2>
                <p
                  className={`page__text ${
                    darkTheme ? "page__text--dark" : ""
                  }`}
                >
                  {" "}
                  Continue your empowering journey by completing the
                  questionnaire below.{" "}
                </p>
              </section>
              <p
                className={`page__text ${darkTheme ? "page__text--dark" : ""}`}
              >
                Please carefully consider and respond to each question based on
                your experiences and feelings in your current work situation.{" "}
                <img
                  src={thinking}
                  alt="Thinking Emoji"
                  className="page__icon"
                />
              </p>
              <MoodForm />
            </div>
          </main>
        </>
      )}
    </>
  );
}
