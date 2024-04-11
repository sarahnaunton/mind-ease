import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ChartContext } from "../../contexts/ChartContext";
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

export default function MoodGraphPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const { darkTheme } = useContext(ThemeContext);
  const { chartData, errorMessage } = useContext(ChartContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {!isLoggedIn && <LogInMessage />}
      {isLoggedIn && (
        <>
          <Navigation />
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
              {chartData && chartData.length === 0 && <GraphNoAnswer />}
              {chartData && chartData.length > 0 && chartData.length < 2 && (
                <GraphOneAnswer chartData={chartData} />
              )}
              {chartData && chartData.length >= 2 && (
                <>
                  <MoodScore chartData={chartData} />
                  <div
                    className={`graph-page__graph ${
                      darkTheme ? "graph-page__graph--dark" : ""
                    }`}
                  >
                    <MoodGraph chartData={chartData} />
                  </div>
                </>
              )}
              {errorMessage && (
                <p className="graph-page__error">{errorMessage}</p>
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
}
