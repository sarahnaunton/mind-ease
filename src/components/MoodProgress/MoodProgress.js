import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import "./MoodProgress.scss";

export default function MoodProgress({ chartData }) {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <>
      {chartData && chartData.length - 2 > chartData.length - 1 && (
        <section className="progress">
          <h2
            className={`progress__heading ${
              darkTheme ? "progress__heading--dark" : ""
            }`}
          >
            Your most recent score has decreased
          </h2>
          <p             className={`progress__text ${
              darkTheme ? "progress__text--dark" : ""
            }`}>
            Congratulations! Your efforts are paying off.
          </p>
          <p className={`progress__text ${
              darkTheme ? "progress__text--dark" : ""
            }`}>
            Your lower score indicates progress towards a healthier mindset.{" "}
          </p>
          <p className={`progress__text ${
              darkTheme ? "progress__text--dark" : ""
            }`}>Keep up the great work!</p>
        </section>
      )}
      {chartData && chartData.length - 2 < chartData.length - 1 && (
        <section className="progress">
          <h2
            className={`progress__heading ${
              darkTheme ? "progress__heading--dark" : ""
            }`}
          >
            Your most recent score has increased
          </h2>
          <p className={`progress__text ${
              darkTheme ? "progress__text--dark" : ""
            }`}>
            Remember, setbacks are part of the journey. Your courage in facing
            these challenges is commendable.
          </p>
          <p className={`progress__text ${
              darkTheme ? "progress__text--dark" : ""
            }`}>
            Let's continue making positive steps forward for your wellbeing, try
            checking out your{" "}
            <Link to="/mood-boosters" className={`progress__link ${
              darkTheme ? "progress__link--dark" : ""
            }`}>
              Mood Boosters
            </Link>{" "}
            for some inspiration.
          </p>
        </section>
      )}
    </>
  );
}