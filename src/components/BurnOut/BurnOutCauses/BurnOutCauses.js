import { useState, useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import "./BurnOutCauses.scss";

export default function BurnOutCauses() {
  const { darkTheme } = useContext(ThemeContext);
  const [isBurnOutModalOpen, setIsBurnOutModalOpen] = useState(false);

  const handleBurnOutModal = () => {
    setIsBurnOutModalOpen(true);
  };

  const closeBurnOutModal = () => {
    setIsBurnOutModalOpen(false);
  };

  return (
    <section className={`burnout ${darkTheme ? "burnout--dark" : ""}`}>
      <h2
        className={`burnout__subheading burnout__subheading--green ${
          darkTheme ? "burnout__subheading--green--dark" : ""
        }`}
      >
        Many things can lead to burnout:
      </h2>
      <ul>
        <li
          className={`burnout__item ${darkTheme ? "burnout__item--dark" : ""}`}
        >
          Feeling like you have little say in decisions at work or not having
          the tools you need to do your job effectively.
        </li>
        <li
          className={`burnout__item ${darkTheme ? "burnout__item--dark" : ""}`}
        >
          Not being sure what's expected of you at work, leading to confusion.
        </li>
        <li
          className={`burnout__item ${darkTheme ? "burnout__item--dark" : ""}`}
        >
          Doing work that's either too repetitive or too chaotic, both of which
          can make you feel tired and overwhelmed.
        </li>
        {!isBurnOutModalOpen && (
          <p
            className={`burnout__link burnout__link--green ${
              darkTheme ? "burnout__link--green--dark" : ""
            }`}
            onClick={handleBurnOutModal}
          >
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
              Being stuck doing tasks that don't match your interests and
              skills, which can be stressful.
            </li>
            <li
              className={`burnout__item ${
                darkTheme ? "burnout__item--dark" : ""
              }`}
            >
              Not having support from colleagues or friends, whether you're at
              work or at home.
            </li>
            <li
              className={`burnout__item ${
                darkTheme ? "burnout__item--dark" : ""
              }`}
            >
              Struggling to find a balance between work and personal life,
              leaving you with little time and energy for yourself and loved
              ones.
            </li>
            <p
              className={`burnout__link burnout__link--green ${
                darkTheme ? "burnout__link--green--dark" : ""
              }`}
              onClick={closeBurnOutModal}
            >
              Click here to see less{" "}
            </p>{" "}
          </>
        )}
      </ul>
    </section>
  );
}
