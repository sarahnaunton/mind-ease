import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import "./GraphNoAnswer.scss";

export default function GraphNoAnswer() {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <section className="message">
      <p
        className={`message__heading ${
          darkTheme ? "message__heading--dark" : ""
        }`}
      >
        You have no burnout questionnaire scores recorded yet.
      </p>
      <p className={`message__text ${darkTheme ? "message__text--dark" : ""}`}>
        Take this opportunity to reflect on your wellbeing. If you're unsure
        where to begin, consider completing the burnout questionnaire. It's a
        valuable tool for assessing your stress levels and identifying areas for
        improvement.
      </p>
    </section>
  );
}
