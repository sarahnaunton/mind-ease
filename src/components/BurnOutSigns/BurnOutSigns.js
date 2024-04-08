import { useState } from "react";
import "./BurnOutSigns.scss";

export default function BurnOutSigns({ darkTheme }) {
  const [isBurnOutModalOpen, setIsBurnOutModalOpen] = useState(false);

  const handleBurnOutModal = () => {
    setIsBurnOutModalOpen(true);
  };

  const closeBurnOutModal = () => {
    setIsBurnOutModalOpen(false);
  };

  return (
    <>
      <article className={`signs ${darkTheme ? "signs--dark" : ""}`}>
        <h2 className="signs__subheading">
          What are some of the signs that could mean you are burnt out?
        </h2>
        <p
          className={`signs__text ${darkTheme ? "signs__text--dark" : ""}`}
        >
          {" "}
          Recognising the signs of burnout is the first step to reclaiming your
          well-being.
        </p>
        <ul>
          <li
            className={`signs__item ${
              darkTheme ? "signs__item--dark" : ""
            }`}
          >
            Persistent exhaustion despite adequate rest and sleep.
          </li>
          <li
            className={`signs__item ${
              darkTheme ? "signs__item--dark" : ""
            }`}
          >
            Decreased satisfaction with your work, relationships or in life.
          </li>
          <li
            className={`signs__item ${
              darkTheme ? "signs__item--dark" : ""
            }`}
          >
            Decreased motivation and productivity, including finding it
            challenging to engage fully in tasks you once enjoyed.
          </li>
          <li
            className={`signs__item ${
              darkTheme ? "signs__item--dark" : ""
            }`}
          >
            Physical symptoms like headaches, stomach issues, or frequent
            illnesses may also be signs of burnout, as the body reacts to
            prolonged stress.
          </li>
          {!isBurnOutModalOpen && (
            <p className="signs__link" onClick={handleBurnOutModal}>
              Click here to see more
            </p>
          )}
          {isBurnOutModalOpen && (
            <>
              <li
                className={`signs__item ${
                  darkTheme ? "signs__item--dark" : ""
                }`}
              >
                Feeling overwhelmed, even by small tasks which can lead to being
                overwhelmed by daily responsibilities.
              </li>
              <li
                className={`signs__item ${
                  darkTheme ? "signs__item--dark" : ""
                }`}
              >
                Difficulty concentrating or focusing on tasks, leading to
                decreased effectiveness and performance.
              </li>
              <li
                className={`signs__item ${
                  darkTheme ? "signs__item--dark" : ""
                }`}
              >
                Withdrawal from social activities or avoiding interacting with
                friends and family.
              </li>
              <li
                className={`signs__item ${
                  darkTheme ? "signs__item--dark" : ""
                }`}
              >
                Increased irritability or frustration.
              </li>
              <li
                className={`signs__item ${
                  darkTheme ? "signs__item--dark" : ""
                }`}
              >
                Feelings of negativism or cynicism related to your work.
              </li>
              <p className="signs__link" onClick={closeBurnOutModal}>
                {" "}
                Click here to see less{" "}
              </p>{" "}
            </>
          )}
        </ul>
      </article>
    </>
  );
}
