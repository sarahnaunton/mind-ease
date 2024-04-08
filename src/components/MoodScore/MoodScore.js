import "./MoodScore.scss";

export default function MoodScore({ scores, darkTheme }) {
  return (
    <>
      {scores && (
        <section className="score">
          <h3
            className={`score__heading ${
              darkTheme ? "score__heading--dark" : ""
            }`}
          >
            Your latest score
          </h3>
          <div className="score__container">
            <p
              className={`score__subheading ${
                darkTheme ? "score__subheading--dark" : ""
              }`}
            >
              Score:
            </p>
            <p
              className={`score__text ${darkTheme ? "score__text--dark" : ""}`}
            >
              {scores[scores.length - 1].score}
            </p>
          </div>
          <div className="score__container">
            <p
              className={`score__subheading ${
                darkTheme ? "score__subheading--dark" : ""
              }`}
            >
              Category:{" "}
            </p>
            <p
              className={`score__text ${darkTheme ? "score__text--dark" : ""}`}
            >
              {scores[scores.length - 1].category} risk
            </p>
          </div>
        </section>
      )}
    </>
  );
}