import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import face from "../../assets/icons/face.png";

export default function BoosterIntroduction() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <section className="introduction">
      <p
        className={`introduction__text ${
          darkTheme ? "introduction__text--dark" : ""
        }`}
      >
        This page is where you can celebrate the simple joys that brighten your
        day.{" "}
        <img src={face} alt="Smile Face Emoji" className="introduction__icon" />
      </p>
      <p
        className={`introduction__text ${
          darkTheme ? "introduction__text--dark" : ""
        }`}
      >
        In times of burnout, it's especially important to have a mindful list of
        activities that bring us joy. Even when we're least inclined to engage
        in them, these mood boosters can serve as helpful prompts, gently
        nudging us back towards a state of balance and wellbeing.
      </p>
      <p
        className={`introduction__text ${
          darkTheme ? "introduction__text--dark" : ""
        }`}
      >
        These boosters can encompass a variety of activities, ranging from the
        calming practice of yoga to the peacefulness of a nature walk, or even
        the immersion of a good book. Ultimately, the choice is yours.
      </p>
    </section>
  );
}
