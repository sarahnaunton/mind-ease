import { Link } from "react-router-dom";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import wave from "../../assets/icons/wave.png";
import "./SignUpPage.scss";

export default function SignUpPage() {
  return (
    <main className="account">
      <section className="account__container">
        <h1 className="account__logo">MindEase</h1>
        <h2 className="account__heading">Sign Up</h2>
        <div className="account__greeting">
          <h3 className="account__subheading">Welcome!</h3>
          <img className="account__icon" src={wave} alt="Wave Emoji" />
        </div>
        <p className="account__text">Please create an account below</p>
        <SignUpForm />
        <p className="account__text">
          Already have an account?{" "}
          <Link className="account__link" to="/log-in">
            Log In
          </Link>
        </p>
      </section>
    </main>
  );
}
