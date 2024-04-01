import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import wave from "../../assets/icons/wave.png";
import "./SignUpPage.scss";

export default function SignUpPage() {
  return (
    <section>
      <form className="form">
        <div className="form__container">
          <h1 className="form__logo">MindEase</h1>
          <h2 className="form__heading">Sign Up</h2>
          <div className="form__greeting">
            <h3 className="form__subheading">Welcome!</h3>
            <img className="form__icon" src={wave} alt="Wave Icon" />
          </div>
          <p className="form__text">Please create an account below</p>
          <fieldset className="form__fieldset">
            <label className="form__label" htmlFor="firstname">
              First Name
            </label>
            <input className="form__input" type="text" id="firstname" name="firstname" />
          </fieldset>
          <fieldset className="form__fieldset">
            <label className="form__label" htmlFor="lastname">
              Last Name
            </label>
            <input className="form__input"  type="text" id="lastname" name="lastname" />
          </fieldset>
          <fieldset className="form__fieldset">
            <label className="form__label" htmlFor="email">
              Email
            </label>
            <input className="form__input"  type="email" id="email" name="email" />
          </fieldset>
          <fieldset className="form__fieldset">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input className="form__input"  type="password" id="password" name="password" />
          </fieldset>
          <fieldset className="form__fieldset">
            <label className="form__label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
            className="form__input" 
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />
          </fieldset>
          <div className="form__button">
            <Button>sign up</Button>
          </div>
          <p className="form__text">
            Already have an account? {""}
            <Link className="form__link" to="/log-in">
              Log In
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
