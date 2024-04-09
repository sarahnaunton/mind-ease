import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import Navigation from "../../components/Navigation/Navigation";
import GraphNoAnswer from "../../components/GraphNoAnswer/GraphNoAnswer";
import GraphOneAnswer from "../../components/GraphOneAnswer";
import MoodGraph from "../../components/MoodGraph";
import MoodScore from "../../components/MoodScore/MoodScore";
import "./MoodGraphPage.scss";

Chart.register(CategoryScale);

export default function MoodGraphPage({ isLoggedIn, handleLogout, darkTheme, handleTheme }) {
  const [chartData, setChartData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

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
      setErrorMessage(false);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  useEffect(() => {
    getChartData();
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
              {chartData && chartData.length === 0 && (
                <GraphNoAnswer darkTheme={darkTheme} />
              )}
              {chartData && chartData.length > 0 && chartData.length < 2 && (
                <GraphOneAnswer darkTheme={darkTheme} chartData={chartData} />
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
              {errorMessage && <p className="graph-page__error">{errorMessage}</p>}
            </div>
          </main>
        </>
      )}
    </>
  );
}
