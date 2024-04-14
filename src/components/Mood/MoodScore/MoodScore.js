import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import "./MoodScore.scss";

export default function MoodScore({ chartData }) {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <>
      {chartData && (
        <section className="score">
          <h3
            className={`score__heading ${
              darkTheme ? "score__heading--dark" : ""
            }`}
          >
            Your latest score
          </h3>
          <div className="score__container">
            <h4
              className={`score__subheading ${
                darkTheme ? "score__subheading--dark" : ""
              }`}
            >
              Score:
            </h4>
            <p
              className={`score__text ${darkTheme ? "score__text--dark" : ""}`}
            >
              {chartData[chartData.length - 1].score}
            </p>
          </div>
          <div className="score__container">
            <h4
              className={`score__subheading ${
                darkTheme ? "score__subheading--dark" : ""
              }`}
            >
              Category:
            </h4>
            <p
              className={`score__text ${darkTheme ? "score__text--dark" : ""}`}
            >
              {chartData[chartData.length - 1].category} risk
            </p>
          </div>
        </section>
      )}
    </>
  );
}
