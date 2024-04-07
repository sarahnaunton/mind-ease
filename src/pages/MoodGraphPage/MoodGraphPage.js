import { useEffect, useState } from "react";
import axios from "axios";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import Navigation from "../../components/Navigation/Navigation";
import MoodGraph from "../../components/MoodGraph";
import MoodScore from "../../components/MoodScore/MoodScore";
import "./MoodGraphPage.scss";

export default function MoodGraphPage({ setIsLoggedIn, isLoggedIn }) {
  const [scores, setScores] = useState(null);
  const [darkTheme, setDarkTheme] = useState(false);

  const getScores = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/scores`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      setScores(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  const handleTheme = () => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
    localStorage.setItem("theme", JSON.stringify(!darkTheme));
  };

  useEffect(() => {
    getScores();
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
          <main className={`graph-page ${darkTheme ? "graph-page--dark" : ""}`}>
            <div className="graph-page__container">
              <section>
                <h1
                  className={`graph-page__heading ${
                    darkTheme ? "graph-page__heading--dark" : ""
                  }`}
                >
                  Monitor your Progress
                </h1>
                <div className="graph-page__information">
                  <h2
                    className={`graph-page__subheading ${
                      darkTheme ? "graph-page__subheading--dark" : ""
                    }`}
                  >
                    Welcome to the mood tracker page for your Oldenburg Burnout
                    Inventory (OBI) scores.
                  </h2>
                  <p
                    className={`graph-page__text ${
                      darkTheme ? "graph-page__text--dark" : ""
                    }`}
                  >
                    {" "}
                    Here, you can visualise your mental health scores over time,
                    helping you track your journey towards well-being and
                    identify patterns in your burnout levels.{" "}
                  </p>
                </div>
              </section>
                  <MoodScore scores={scores} darkTheme={darkTheme} />
                  <div
                    className={`graph-page__graph ${
                      darkTheme ? "graph-page__graph--dark" : ""
                    }`}
                  >
                    <MoodGraph scores={scores} darkTheme={darkTheme}/>
                  </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}
