import { Link } from "react-router-dom";
import wave from "../assets/icons/wave.png";
import LogInForm from "../components/LogInForm";
import "./SignUpPage/SignUpPage.scss";

export default function LogInPage({ setIsLoggedIn }) {
  return (
    <main className="account">
      <section className="account__container">
        <h1 className="account__logo">MindEase</h1>
        <h2 className="account__heading">Log In</h2>
        <div className="account__greeting">
          <h3 className="account__subheading">Welcome Back!</h3>
          <img className="account__icon" src={wave} alt="Wave Icon" />
        </div>
        <p className="account__text">Please log in below</p>
        <LogInForm setIsLoggedIn={setIsLoggedIn}/>
        <p className="account__text">
          Don't have an account?{" "}
          <Link className="account__link" to="/sign-up">
            Sign Up
          </Link>
        </p>
      </section>
    </main>
  );
}
