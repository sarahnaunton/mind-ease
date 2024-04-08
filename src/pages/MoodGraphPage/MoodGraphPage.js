import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import Navigation from "../../components/Navigation/Navigation";
import MoodGraph from "../../components/MoodGraph";
import MoodScore from "../../components/MoodScore/MoodScore";
import "./MoodGraphPage.scss";

Chart.register(CategoryScale);

export default function MoodGraphPage({ setIsLoggedIn, isLoggedIn }) {
  const [chartData, setChartData] = useState(null);
  const [darkTheme, setDarkTheme] = useState(false);

  const getChartData = async () => {
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
      setChartData(data);
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
    getChartData();
    const themeJSON = localStorage.getItem("theme");
    if (themeJSON) {
      setDarkTheme(JSON.parse(themeJSON));
    }
  }, []);

  const noQuestionnairesJSX = (
    <section>
      <p
        className={`graph-page__message ${
          darkTheme ? "graph-page__message--dark" : ""
        }`}
      >
        You have no burn out questionnaire scores recorded yet.
      </p>
      <p
        className={`graph-page__message ${
          darkTheme ? "graph-page__message--dark" : ""
        }`}
      >
        Take this opportunity to reflect on your well-being. If you're unsure
        where to begin, consider completing the burnout questionnaire. It's a
        valuable tool for assessing your stress levels and identifying areas for
        improvement.
      </p>
    </section>
  );

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
                    Here, you can visualise your mental health scores over time,
                    helping you track your journey towards well-being and
                    identify patterns in your burnout levels.
                  </p>
                </div>
              </section>
              {!chartData && noQuestionnairesJSX}
              {chartData && chartData.length < 2 && (
                <>
                  <MoodScore chartData={chartData} darkTheme={darkTheme} />
                  <section>
                    <p
                      className={`graph-page__message ${
                        darkTheme ? "graph-page__message--dark" : ""
                      }`}
                    >
                      You haven't accumulated sufficient questionnaire responses
                      to be displayed on the graph.
                    </p>
                    <p
                      className={`graph-page__message ${
                        darkTheme ? "graph-page__message--dark" : ""
                      }`}
                    >
                      Keep track of your progress by completing the
                      questionnaire regularly. Your mental well-being matters,
                      and taking the time to reflect and assess your feelings
                      can be a valuable step towards self-care and improvement.
                    </p>
                  </section>
                </>
              )}
              {chartData && chartData.length >= 2 && (
                <>
                  <MoodScore chartData={chartData} darkTheme={darkTheme} />
                  <div
                    className={`graph-page__graph ${
                      darkTheme ? "graph-page__graph--dark" : ""
                    }`}
                  >
                    <MoodGraph chartData={chartData} />
                  </div>
                </>
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
}
