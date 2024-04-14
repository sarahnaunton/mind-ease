import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import pen from "../../assets/icons/pen.png";

export default function JournalIntroduction() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <section className="introduction">
      <p
        className={`introduction__text ${
          darkTheme ? "introduction__text--dark" : ""
        }`}
      >
        Welcome to your journaling space, where your thoughts find expression
        and your emotions are heard.{" "}
        <img src={pen} alt="Pen in Hand Emoji" className="introduction__icon" />
      </p>
      <p
        className={`introduction__text ${
          darkTheme ? "introduction__text--dark" : ""
        }`}
      >
        Journaling offers a unique opportunity to understand yourself better,
        gain clarity, and encourage personal growth. Through journaling, you can
        track your progress, celebrate victories, and navigate challenges.
        Remember, every entry is a step towards self-discovery and empowerment.
      </p>
    </section>
  );
}
