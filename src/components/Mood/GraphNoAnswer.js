import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import face from "../../assets/icons/face.png";

export default function GraphNoAnswer() {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <section className={`result ${darkTheme ? "result--dark" : ""}`}>
      <h3
        className={`result__heading ${
          darkTheme ? "result__heading--dark" : ""
        }`}
      >
        You have no burnout questionnaire scores recorded yet.
      </h3>
      <p className={`result__text ${darkTheme ? "result__text--dark" : ""}`}>
        Take this opportunity to reflect on your wellbeing. If you're unsure
        where to begin, consider completing the burnout questionnaire. It's a
        valuable tool for assessing your stress levels and identifying areas for
        improvement.
        <img src={face} alt="Smile Face Emoji" className="result__icon" />
      </p>
      <p className={`result__text ${darkTheme ? "result__text--dark" : ""}`}>
        You can find the questionnaire here at {""}
        <Link
          to="/mood-form"
          className={`result__link ${
            darkTheme ? "result__link--dark" : ""
          }`}
        >
          Mood Check In
        </Link>
      </p>
    </section>
  );
}
