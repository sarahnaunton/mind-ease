import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import bicep from "../../assets/icons/bicep.png";

export default function MoodWorse() {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <section className={`result ${darkTheme ? "result--dark" : ""}`}>
      <h3
        className={`result__heading ${
          darkTheme ? "result__heading--dark" : ""
        }`}
      >
        Your most recent score has increased
      </h3>
      <p className={`result__text ${darkTheme ? "result__text--dark" : ""}`}>
        Remember, setbacks are part of the journey. Your courage in facing these
        challenges is commendable.
        <img src={bicep} alt="Bicep Emoji" className="result__icon" />
      </p>
      <p className={`result__text ${darkTheme ? "result__text--dark" : ""}`}>
        Let's keep trying to make positive progress in your wellbeing, try
        checking out your{" "}
        <Link
          to="/mood-boosters"
          className={`result__link ${darkTheme ? "result__link--dark" : ""}`}
        >
          Mood Boosters
        </Link>{" "}
        for some inspiration.
      </p>
    </section>
  );
}
