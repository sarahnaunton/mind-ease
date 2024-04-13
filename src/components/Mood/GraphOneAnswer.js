import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import MoodScore from "./MoodScore/MoodScore";

export default function GraphOneAnswer({ chartData }) {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <>
      <MoodScore chartData={chartData} />
      <section>
        <p
          className={`message__heading ${
            darkTheme ? "message__heading--dark" : ""
          }`}
        >
          You haven't accumulated sufficient questionnaire responses to be
          displayed on the graph.
        </p>
        <p
          className={`message__text ${darkTheme ? "message__text--dark" : ""}`}
        >
          Keep track of your progress by completing the questionnaire regularly.
          Your mental wellbeing matters, and taking the time to reflect and
          assess your feelings can be a valuable step towards self-care and
          improvement.
        </p>
      </section>
    </>
  );
}
