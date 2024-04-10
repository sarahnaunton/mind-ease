import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button/Button";
import "./SignUpForm.scss";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleForm = async (event) => {
    event.preventDefault();
    setFormSubmitted(false);
    setErrorMessage(false);
    setFormError({});

    let formValid = true;
    const error = {};

    if (!formData.firstname) {
      formValid = false;
      error.firstname = "Please enter your first name";
    }

    if (!formData.lastname) {
      formValid = false;
      error.lastname = "Please enter your last name";
    }

    if (!formData.email) {
      formValid = false;
      error.email = "Please enter your email";
    }

    if (!formData.password) {
      formValid = false;
      error.password = "Please enter your password";
    }

    if (!formData.confirmPassword) {
      formValid = false;
      error.confirmPassword = "Please enter your confirmed password";
    }

    if (
      formData.password.length < 8 ||
      !formData.password.includes("!" || "£" || "%" || "&" || "*" || "#" || "?")
    ) {
      formValid = false;
      error.password =
        "Please enter a password that is at least 8 characters and contains at least one of the following characters ! £ % & * # ?";
    }

    if (formData.password !== formData.confirmPassword) {
      formValid = false;
      error.confirmPassword = "Please ensure your passwords match";
    }

    if (!formValid) {
      setFormError(error);
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/register`,
        formData
      );
      setErrorMessage(false);
      setSuccessMessage(true);
      setFormSubmitted(true);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/log-in");
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <form className="form" onSubmit={handleForm}>
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="firstname">
          First Name
        </label>
        <input
          className={`form__input ${
            formError.firstname ? "form__input--error" : ""
          }`}
          type="text"
          id="firstname"
          name="firstname"
          onChange={handleChange}
          value={formData.firstname}
        />
      </fieldset>
      {formError.firstname && (
        <fieldset className="form__fieldset">
          <p className="form__error">{formError.firstname}</p>
        </fieldset>
      )}
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="lastname">
          Last Name
        </label>
        <input
          className={`form__input ${
            formError.lastname ? "form__input--error" : ""
          }`}
          type="text"
          id="lastname"
          name="lastname"
          onChange={handleChange}
          value={formData.lastname}
        />
      </fieldset>
      {formError.lastname && (
        <fieldset className="form__fieldset">
          <p className="form__error">{formError.lastname}</p>
        </fieldset>
      )}
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="email">
          Email
        </label>
        <input
          className={`form__input ${
            formError.email ? "form__input--error" : ""
          }`}
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
      </fieldset>
      {formError.email && (
        <fieldset className="form__fieldset">
          <p className="form__error">{formError.email}</p>
        </fieldset>
      )}
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input
          className={`form__input ${
            formError.password ? "form__input--error" : ""
          }`}
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
      </fieldset>
      {formError.password && (
        <fieldset className="form__fieldset">
          <p className="form__error form__error--spacing">
            {formError.password}
          </p>
        </fieldset>
      )}
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className={`form__input ${
            formError.confirmPassword ? "form__input--error" : ""
          }`}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
        />
      </fieldset>
      {formError.confirmPassword && (
        <fieldset className="form__fieldset">
          <p className="form__error">{formError.confirmPassword}</p>
        </fieldset>
      )}
      <p>
        You are not required to provide the following information, but any
        details you share will help us better understand your needs and
        preferences, and help us suggest more personalised strategies to boost your mood.
      </p>
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="birthday">
          Date of Birth
        </label>
        <input
          className="form__input"
          type="date"
          id="birthday"
          name="birthday"
          onChange={handleChange}
          //   value={formData.birthday}
        />
      </fieldset>
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="occupation">
          Occupation
        </label>
        <input
          className="form__input"
          type="text"
          id="occupation"
          name="occupation"
          onChange={handleChange}
          //   value={formData.occupation}
        />
      </fieldset>
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="role">
          Job Role
        </label>
        <input
          className="form__input"
          type="text"
          id="role"
          name="role"
          onChange={handleChange}
          //   value={formData.role}
        />
      </fieldset>
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="experience">
          Years of Experience
        </label>
        <input
          className="form__input"
          type="text"
          id="experience"
          name="experience"
          onChange={handleChange}
          placeholder="How many  do you typically work per week?"
          //   value={formData.hours}
        />
      </fieldset>
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="setting">
          Work Setting
        </label>
        <input
          className="form__input"
          type="text"
          id="setting"
          name="setting"
          onChange={handleChange}
          placeholder="Office, Remote, Healthcare, Education"
          //   value={formData.setting}
        />
      </fieldset>
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="hours">
          Work Hours
        </label>
        <input
          className="form__input"
          type="text"
          id="hours"
          name="hours"
          onChange={handleChange}
          placeholder="How many hours do you typically work per week?"
          //   value={formData.hours}
        />
      </fieldset>
      <div className="form__button">
        <Button>Sign Up</Button>
      </div>
      {errorMessage && <p className="form__error">{errorMessage}</p>}
      {successMessage && (
        <p className="form__text form__text--success">
          {" "}
          Successful! Directing you to the log in page.
        </p>
      )}
    </form>
  );
}
