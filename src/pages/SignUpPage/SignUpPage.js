import { Link } from "react-router-dom";
import wave from "../../assets/icons/wave.png";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import "./SignUpPage.scss";

export default function SignUpPage() {
  return (
    <section className="account">
      <div className="account__container">
        <h1 className="account__logo">MindEase</h1>
        <h2 className="account__heading">Sign Up</h2>
        <div className="account__greeting">
          <h3 className="account__subheading">Welcome!</h3>
          <img className="account__icon" src={wave} alt="Wave Icon" />
        </div>
        <p className="account__text">Please create an account below</p>
        <SignUpForm />
        <p className="account__text">
          Already have an account?{" "}
          <Link className="account__link" to="/log-in">
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
}
