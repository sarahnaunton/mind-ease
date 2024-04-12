import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./WelcomePage.scss";

export default function WelcomePage() {
  return (
    <main className="welcome">
      <section className="welcome__container">
        <h1 className="welcome__logo">MindEase</h1>
        <p className="welcome__text">
          Welcome to MindEase, your guide to mental wellness. Recognise signs of
          burnout early and take proactive steps to maintain balance and
          wellbeing.
        </p>
        <div className="welcome__buttons">
          <Link to="/sign-up">
            <Button>Sign Up</Button>
          </Link>
          <Link to="/log-in">
            <Button>Log In</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
