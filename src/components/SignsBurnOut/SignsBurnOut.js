import { useState } from "react";
import "./SignsBurnOut.scss";

export default function SignsBurnOut({ darkTheme }) {
  const [isBurnOutModalOpen, setIsBurnOutModalOpen] = useState(false);

  const handleBurnOutModal = () => {
    setIsBurnOutModalOpen(true);
  };

  const closeBurnOutModal = () => {
    setIsBurnOutModalOpen(false);
  };

  return (
    <>
      <article className={`burnout ${darkTheme ? "burnout--dark" : ""}`}>
        <h2 className="burnout__subheading">
          What are some of the signs that could mean you are burnt out?
        </h2>
        <ul>
          <li
            className={`burnout__item ${
              darkTheme ? "burnout__item--dark" : ""
            }`}
          >
            Persistent exhaustion despite adequate rest and sleep.
          </li>
          <li
            className={`burnout__item ${
              darkTheme ? "burnout__item--dark" : ""
            }`}
          >
            Decreased satisfaction with your work, relationships or in life.
          </li>
          <li
            className={`burnout__item ${
              darkTheme ? "burnout__item--dark" : ""
            }`}
          >
            Decreased motivation and productivity, including finding it
            challenging to engage fully in tasks you once enjoyed.
          </li>
          <li
            className={`burnout__item ${
              darkTheme ? "burnout__item--dark" : ""
            }`}
          >
            Physical symptoms like headaches, stomach issues, or frequent
            illnesses may also be signs of burnout, as the body reacts to
            prolonged stress.
          </li>
          {!isBurnOutModalOpen && (
            <p className="burnout__link" onClick={handleBurnOutModal}>
              Click here to see more
            </p>
          )}
          {isBurnOutModalOpen && (
            <>
              <li
                className={`burnout__item ${
                  darkTheme ? "burnout__item--dark" : ""
                }`}
              >
                Feeling overwhelmed, even by small tasks which can lead to being
                overwhelmed by daily responsibilities.
              </li>
              <li
                className={`burnout__item ${
                  darkTheme ? "burnout__item--dark" : ""
                }`}
              >
                Difficulty concentrating or focusing on tasks, leading to
                decreased effectiveness and performance
              </li>
              <li
                className={`burnout__item ${
                  darkTheme ? "burnout__item--dark" : ""
                }`}
              >
                Withdrawal from social activities or avoiding interacting with
                friends and family
              </li>
              <li
                className={`burnout__item ${
                  darkTheme ? "burnout__item--dark" : ""
                }`}
              >
                Increased irritability or frustration.
              </li>
              <p className="burnout__link" onClick={closeBurnOutModal}>
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
