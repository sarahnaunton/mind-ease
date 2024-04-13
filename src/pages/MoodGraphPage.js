import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { ChartContext } from "../contexts/ChartContext";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import LogInMessage from "../components/LogInMessage/LogInMessage";
import Loader from "../components/Loader/Loader";
import Navigation from "../components/Navigation/Navigation";
import GraphNoAnswer from "../components/GraphNoAnswer/GraphNoAnswer";
import GraphOneAnswer from "../components/GraphOneAnswer";
import MoodGraph from "../components/MoodGraph";
import MoodProgress from "../components/MoodProgress/MoodProgress";
import MoodScore from "../components/MoodScore/MoodScore";

Chart.register(CategoryScale);

export default function MoodGraphPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const { darkTheme } = useContext(ThemeContext);
  const { chartData, getChartData, errorMessage } = useContext(ChartContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    getChartData();
  }, []);

  return (
    <>
      {!isLoggedIn && <LogInMessage />}
      {isLoggedIn && !chartData && <Loader />}
      {isLoggedIn && chartData && (
        <>
          <Navigation />
          <main className={`page ${darkTheme ? "page--dark" : ""}`}>
            <div className="page__container">
              <section>
                <h1
                  className={`page__heading ${
                    darkTheme ? "page__heading--dark" : ""
                  }`}
                >
                  Monitor your wellbeing
                </h1>
                <div className={`page__information ${
                      darkTheme ? "page__information--dark" : ""
                    }`}>
                  <h2
                    className={`page__subheading ${
                      darkTheme ? "page__subheading--dark" : ""
                    }`}
                  >
                    Welcome to the mood tracker page for your Oldenburg Burnout
                    Inventory (OBI) scores.
                  </h2>
                  <p
                    className={`page__text ${
                      darkTheme ? "page__text--dark" : ""
                    }`}
                  >
                    Here, you can visualise your mental health scores over time,
                    helping you track your journey towards wellbeing and
                    identify patterns in your burnout levels.
                  </p>
                  <p
                    className={`page__text ${
                      darkTheme ? "page__text--dark" : ""
                    }`}
                  >
                    Low scores suggest a lower risk of burnout, while high
                    scores indicate a higher risk.{" "}
                  </p>
                </div>
              </section>
              {chartData && chartData.length === 0 && <GraphNoAnswer />}
              {chartData && chartData.length > 0 && chartData.length < 2 && (
                <GraphOneAnswer chartData={chartData} />
              )}
              {chartData && chartData.length >= 2 && (
                <>
                  <MoodScore chartData={chartData} />
                  <MoodProgress chartData={chartData} />
                  <div
                    className={`page__graph ${
                      darkTheme ? "page__graph--dark" : ""
                    }`}
                  >
                    <MoodGraph chartData={chartData} />
                  </div>
                </>
              )}
              {errorMessage && (
                <p className="page__error">{errorMessage}</p>
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
}
