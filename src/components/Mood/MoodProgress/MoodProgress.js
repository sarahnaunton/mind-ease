import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import celebration from "../../../assets/icons/celebration.png";
import "./MoodProgress.scss";

export default function MoodProgress() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <section className={`result ${darkTheme ? "result--dark" : ""}`}>
      <h3
        className={`result__heading ${
          darkTheme ? "result__heading--dark" : ""
        }`}
      >
        Your most recent score has decreased
      </h3>
      <p className={`result__text ${darkTheme ? "result__text--dark" : ""}`}>
        Congratulations! Your efforts are paying off.{" "}
        <img
          src={celebration}
          alt="Celebration Emoji"
          className="result__icon"
        />
        Your lower score indicates progress towards a healthier mindset. Keep up
        the great work!
      </p>
    </section>
  );
}
