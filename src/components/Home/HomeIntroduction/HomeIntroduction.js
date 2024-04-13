import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import thumbsUp from "../../../assets/icons/thumbs-up.png";
import "./HomeIntroduction.scss";

export default function HomeIntroduction() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <section className="introduction">
      <div className={`introduction__container ${darkTheme ? "introduction__container--dark" : ""}`}>
        <p
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
        </p>
        <p
          className={`introduction__subheading ${
            darkTheme ? "introduction__subheading--dark" : ""
          }`}
        >
          Monitor your burnout score, journal your thoughts, and discover
          personalised activities for your wellbeing.
        </p>
        <p
          className={`introduction__subheading ${
            darkTheme ? "introduction__subheading--dark" : ""
          }`}
        >
          Let's thrive together!{" "}
          <img src={thumbsUp} alt="Thumbs Up Emoji" className="introduction__icon" />
        </p>
      </div>
    </section>
  );
}
