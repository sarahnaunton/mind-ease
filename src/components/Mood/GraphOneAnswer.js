import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import face from "../../assets/icons/face.png";

export default function GraphOneAnswer() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <section className={`result ${darkTheme ? "result--dark" : ""}`}>
      <h3
        className={`result__heading ${
          darkTheme ? "result__heading--dark" : ""
        }`}
      >
        You haven't accumulated sufficient questionnaire responses to be
        displayed on the graph.
      </h3>
      <p className={`result__text ${darkTheme ? "result__text--dark" : ""}`}>
        Keep track of your progress by completing the questionnaire regularly.
        Your mental wellbeing matters, and taking the time to reflect and assess
        your feelings can be a valuable step towards self-care and improvement.
        <img src={face} alt="Smile Face Emoji" className="result__icon" />
      </p>
    </section>
  );
}
