import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import bicep from "../../assets/icons/bicep.png";
import clap from "../../assets/icons/clap.png";
import celebration from "../../assets/icons/celebration.png";
import "./MoodProgress.scss";

export default function MoodProgress({ chartData }) {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <>
      {chartData[chartData.length - 2].score >
        chartData[chartData.length - 1].score && (
        <section className={`progress ${darkTheme ? "progress--dark" : ""}`}>
          <h2
            className={`progress__heading ${
              darkTheme ? "progress__heading--dark" : ""
            }`}
          >
            Your most recent score has decreased
          </h2>
          <p
            className={`progress__text ${
              darkTheme ? "progress__text--dark" : ""
            }`}
          >
            Congratulations! Your efforts are paying off.{" "}
            <img
              src={celebration}
              alt="Celebration Icon"
              className="progress__icon"
            />
            Your lower score indicates progress towards a healthier mindset.
            Keep up the great work!
          </p>
        </section>
      )}
      {chartData[chartData.length - 2].score ===
        chartData[chartData.length - 1].score && (
        <section className={`progress ${darkTheme ? "progress--dark" : ""}`}>
          <h2
            className={`progress__heading ${
              darkTheme ? "progress__heading--dark" : ""
            }`}
          >
            Your most recent score has stayed the same
          </h2>
          <p
            className={`progress__text ${
              darkTheme ? "progress__text--dark" : ""
            }`}
          >
            Consistency is key on your journey to improved wellbeing. Well done!{" "}
            <img src={clap} alt="Clap Icon" className="progress__icon" />
          </p>
          <p
            className={`progress__text ${
              darkTheme ? "progress__text--dark" : ""
            }`}
          >
            Let's keep trying to make positive progress in your wellbeing, try
            checking out your{" "}
            <Link
              to="/mood-boosters"
              className={`progress__link ${
                darkTheme ? "progress__link--dark" : ""
              }`}
            >
              Mood Boosters
            </Link>{" "}
            for some inspiration.
          </p>
        </section>
      )}
      {chartData[chartData.length - 2].score <
        chartData[chartData.length - 1].score && (
        <section className={`progress ${darkTheme ? "progress--dark" : ""}`}>
          <h2
            className={`progress__heading ${
              darkTheme ? "progress__heading--dark" : ""
            }`}
          >
            Your most recent score has increased
          </h2>
          <p
            className={`progress__text ${
              darkTheme ? "progress__text--dark" : ""
            }`}
          >
            Remember, setbacks are part of the journey. Your courage in facing
            these challenges is commendable.{" "}
            <img src={bicep} alt="Bicep Icon" className="progress__icon" />
          </p>
          <p
            className={`progress__text ${
              darkTheme ? "progress__text--dark" : ""
            }`}
          >
            Let's keep trying to make positive progress in your wellbeing, try
            checking out your{" "}
            <Link
              to="/mood-boosters"
              className={`progress__link ${
                darkTheme ? "progress__link--dark" : ""
              }`}
            >
              Mood Boosters
            </Link>{" "}
            for some inspiration.
          </p>
        </section>
      )}
    </>
  );
}
