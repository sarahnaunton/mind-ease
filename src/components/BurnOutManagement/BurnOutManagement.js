import { Link } from "react-router-dom";
import "./BurnOutManagement.scss";

export default function BurnOutManagement({ darkTheme }) {
  return (
    <section className={`management ${darkTheme ? "management--dark" : ""}`}>
      <h2
        className={`management__subheading ${
          darkTheme ? "management__subheading--dark" : ""
        }`}
      >
        Coping with burnout
      </h2>
      <p
        className={`management__text ${
          darkTheme ? "management__text--dark" : ""
        }`}
      >
        To tackle burnout head-on, it's essential to take proactive steps to
        protect your mental and emotional well-being.
      </p>
      <p
        className={`management__text ${
          darkTheme ? "management__text--dark" : ""
        }`}
      >
        Here are some strategies to help you navigate through it:
      </p>
      <ul>
        <li
          className={`management__item ${
            darkTheme ? "management__item--dark" : ""
          }`}
        >
          Lean on your support network. Talking to loved ones can provide
          invaluable support when facing job stress and burnout.
        </li>
        <li
          className={`management__item ${
            darkTheme ? "management__item--dark" : ""
          }`}
        >
          Move your body. Regular exercise, like taking a walk, can work wonders
          in managing stress levels.
        </li>
        <li
          className={`management__item ${
            darkTheme ? "management__item--dark" : ""
          }`}
        >
          Nourish yourself. Eating well and prioritizing healthy meals can fuel
          your body and mind.
        </li>
        <li
          className={`management__item ${
            darkTheme ? "management__item--dark" : ""
          }`}
        >
          Rest up. Adequate sleep is essential for rejuvenating your energy and
          resilience.
        </li>
        <li
          className={`management__item ${
            darkTheme ? "management__item--dark" : ""
          }`}
        >
          Take breaks. Pause throughout your workday to recharge and reset
        </li>
        <li
          className={`management__item ${
            darkTheme ? "management__item--dark" : ""
          }`}
        >
          Make time for joy. Schedule activities you enjoy to maintain a healthy
          work-life balance.
        </li>
        <li
          className={`management__item ${
            darkTheme ? "management__item--dark" : ""
          }`}
        >
          Recharge with time off. Use your annual leave to relax, recharge, and
          prioritize self-care.
        </li>
        <li
          className={`management__item ${
            darkTheme ? "management__item--dark" : ""
          }`}
        >
          Communicate your concerns. Discuss issues with your manager,
          supervisor or HR and explore potential solutions together - it might
          be that you need some time off work.
        </li>
        <li
          className={`management__item ${
            darkTheme ? "management__item--dark" : ""
          }`}
        >
          Ask for support. Don't hesitate to seek help from your GP if burnout
          is overwhelming you.
        </li>
      </ul>
      <div className="management__wrapper">
        <p
          className={`management__text ${
            darkTheme ? "management__text--dark" : ""
          }`}
        >
          Also remember to use your strategies in your{" "}
          <Link
            to="/home"
            className={`management__link ${
              darkTheme ? "management__link--dark" : ""
            }`}
          >
            Mood Booster
          </Link>
        </p>
      </div>
    </section>
  );
}
