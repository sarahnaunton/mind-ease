import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import thumbsUp from "../../../assets/icons/thumbs-up.png";
import "./HomeIntroduction.scss";

export default function HomeIntroduction() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <section className="introduction">
      <div
        className={`introduction__container ${
          darkTheme ? "introduction__container--dark" : ""
        }`}
      >
        <h3
          className={`introduction__subheading ${
            darkTheme ? "introduction__subheading--dark" : ""
          }`}
        >
          Explore{" "}
          <span
            className={`introduction__logo ${
              darkTheme ? "introduction__logo--dark" : ""
            }`}
          >
            MindEase
          </span>
          ,
        </h3>
        <h3
          className={`introduction__subheading ${
            darkTheme ? "introduction__subheading--dark" : ""
          }`}
        >
          Monitor your burnout score, journal your thoughts, and discover
          personalised activities for your wellbeing.
        </h3>
        <h3
          className={`introduction__subheading ${
            darkTheme ? "introduction__subheading--dark" : ""
          }`}
        >
          Let's thrive together!{" "}
          <img
            src={thumbsUp}
            alt="Thumbs Up Emoji"
            className="introduction__icon"
          />
        </h3>
      </div>
    </section>
  );
}
