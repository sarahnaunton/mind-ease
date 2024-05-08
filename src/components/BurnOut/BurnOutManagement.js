import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function BurnOutManagement() {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <section className={`burnout ${darkTheme ? "burnout--dark" : ""}`}>
      <h2
        className={`burnout__subheading burnout__subheading--orange ${
          darkTheme ? "burnout__subheading--orange--dark" : ""
        }`}
      >
        Coping with burnout
      </h2>
      <p className={`burnout__text ${darkTheme ? "burnout__text--dark" : ""}`}>
        To tackle burnout head-on, it's essential to take proactive steps to
        protect your mental and emotional wellbeing.
      </p>
      <p className={`burnout__text ${darkTheme ? "burnout__text--dark" : ""}`}>
        Here are some general strategies to help you navigate through it:
      </p>
      <ul>
        <li
          className={`burnout__item ${darkTheme ? "burnout__item--dark" : ""}`}
        >
          Lean on your support network. Talking to loved ones can provide
          invaluable support when facing job stress and burnout.
        </li>
        <li
          className={`burnout__item ${darkTheme ? "burnout__item--dark" : ""}`}
        >
          Move your body. Regular exercise, like taking a walk, can work wonders
          in managing stress levels.
        </li>
        <li
          className={`burnout__item ${darkTheme ? "burnout__item--dark" : ""}`}
        >
          Nourish yourself. Eating well and prioritizing healthy meals can fuel
          your body and mind.
        </li>
        <li
          className={`burnout__item ${darkTheme ? "burnout__item--dark" : ""}`}
        >
          Rest up. Adequate sleep is essential for rejuvenating your energy and
          resilience.
        </li>
        <li
          className={`burnout__item ${darkTheme ? "burnout__item--dark" : ""}`}
        >
          Take breaks. Pause throughout your workday to recharge and reset
        </li>
        <li
          className={`burnout__item ${darkTheme ? "burnout__item--dark" : ""}`}
        >
          Make time for joy. Schedule activities you enjoy to maintain a healthy
          work-life balance.
        </li>
        <li
          className={`burnout__item ${darkTheme ? "burnout__item--dark" : ""}`}
        >
          Recharge with time off. Use your annual leave to relax, recharge, and
          prioritize self-care.
        </li>
        <li
          className={`burnout__item ${darkTheme ? "burnout__item--dark" : ""}`}
        >
          Communicate your concerns. Discuss issues with your manager,
          supervisor or HR and explore potential solutions together - it might
          be that you need some time off work.
        </li>
        <li
          className={`burnout__item ${darkTheme ? "burnout__item--dark" : ""}`}
        >
          Ask for support. Don't hesitate to seek help from your GP if burnout
          is overwhelming you.
        </li>
      </ul>
      <p className={`burnout__text ${darkTheme ? "burnout__text--dark" : ""}`}>
        Also, remember to use your strategies in your{" "}
        <Link
          to="/mood-boosters"
          className={`burnout__link burnout__link--orange ${
            darkTheme ? "burnout__link--orange--dark" : ""
          }`}
        >
          Mood Boosters
        </Link>
      </p>
    </section>
  );
}
