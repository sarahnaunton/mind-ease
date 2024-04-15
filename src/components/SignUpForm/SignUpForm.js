import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    birthday: "",
    occupation: "",
    role: "",
    experience: "",
    setting: "",
    hours: "",
  });
  const [formError, setFormError] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleInformationModal = () => {
    setIsInformationModalOpen(true);
  };

  const closeInformationModal = () => {
    setIsInformationModalOpen(false);
  };

  const handleForm = async (event) => {
    event.preventDefault();
    setSuccessMessage(false);
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

  const passwordValidation =   /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

    if (!passwordValidation.test(formData.password)
    ) {
      formValid = false;
      error.password =
        "Please enter a password that contains at least one uppercase and lowercase letter, one digit, one special character and is between 8-16 characters long";
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
      setSuccessMessage(true);
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
    <form className="auth-form" onSubmit={handleForm}>
      <fieldset className="auth-form__fieldset">
        <label className="auth-form__label" htmlFor="firstname">
          First Name
        </label>
        <input
          className={`auth-form__input ${
            formError.firstname ? "auth-form__input--error" : ""
          }`}
          type="text"
          id="firstname"
          name="firstname"
          placeholder="First Name"
          onChange={handleChange}
          value={formData.firstname}
        />
      </fieldset>
      {formError.firstname && (
        <p className="auth-form__error">{formError.firstname}</p>
      )}
      <fieldset className="auth-form__fieldset">
        <label className="auth-form__label" htmlFor="lastname">
          Last Name
        </label>
        <input
          className={`auth-form__input ${
            formError.lastname ? "auth-form__input--error" : ""
          }`}
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Last Name"
          onChange={handleChange}
          value={formData.lastname}
        />
      </fieldset>
      {formError.lastname && (
        <p className="auth-form__error">{formError.lastname}</p>
      )}
      <fieldset className="auth-form__fieldset">
        <label className="auth-form__label" htmlFor="email">
          Email
        </label>
        <input
          className={`auth-form__input ${
            formError.email ? "auth-form__input--error" : ""
          }`}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
        />
      </fieldset>
      {formError.email && <p className="auth-form__error">{formError.email}</p>}
      <fieldset className="auth-form__fieldset">
        <label className="auth-form__label" htmlFor="password">
          Password
        </label>
        <input
          className={`auth-form__input ${
            formError.password ? "auth-form__input--error" : ""
          }`}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
        />
      </fieldset>
      {formError.password && (
        <p className="auth-form__error">{formError.password}</p>
      )}
      <fieldset className="auth-form__fieldset">
        <label className="auth-form__label" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className={`auth-form__input ${
            formError.confirmPassword ? "auth-form__input--error" : ""
          }`}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={formData.confirmPassword}
        />
      </fieldset>
      {formError.confirmPassword && (
        <p className="auth-form__error">{formError.confirmPassword}</p>
      )}
      {!isInformationModalOpen && (
        <p className="auth-form__link" onClick={handleInformationModal}>
          Click here to provide additional information
        </p>
      )}
      {isInformationModalOpen && (
        <>
          <p className="auth-form__text">
            The following information is not required, but any details you share
            will help us better understand your needs and preferences, and help
            us suggest more personalised strategies to boost your mood.
          </p>
          <fieldset className="auth-form__fieldset">
            <label className="auth-form__label" htmlFor="birthday">
              Date of Birth
            </label>
            <input
              className="auth-form__input auth-form__input--spacing"
              type="date"
              id="birthday"
              name="birthday"
              onChange={handleChange}
              value={formData.birthday}
            />
          </fieldset>
          <fieldset className="auth-form__fieldset">
            <label className="auth-form__label" htmlFor="occupation">
              Occupation
            </label>
            <input
              className="auth-form__input"
              type="text"
              id="occupation"
              name="occupation"
              placeholder="Occupation"
              onChange={handleChange}
              value={formData.occupation}
            />
          </fieldset>
          <fieldset className="auth-form__fieldset">
            <label className="auth-form__label" htmlFor="role">
              Job Role
            </label>
            <input
              className="auth-form__input"
              type="text"
              id="role"
              name="role"
              placeholder="Job Role"
              onChange={handleChange}
              value={formData.role}
            />
          </fieldset>
          <fieldset className="auth-form__fieldset">
            <label className="auth-form__label" htmlFor="experience">
              Year started current job?
            </label>
            <input
              className="auth-form__input"
              type="number"
              id="experience"
              name="experience"
              placeholder="E.g. 2013"
              onChange={handleChange}
              value={formData.experience}
            />
          </fieldset>
          <fieldset className="auth-form__fieldset">
            <label className="auth-form__label" htmlFor="setting">
              Work Setting
            </label>
            <input
              className="auth-form__input"
              type="text"
              id="setting"
              name="setting"
              onChange={handleChange}
              placeholder="E.g. office or remote"
              value={formData.setting}
            />
          </fieldset>
          <fieldset className="auth-form__fieldset">
            <label className="auth-form__label" htmlFor="hours">
              Work Hours
            </label>
            <input
              className="auth-form__input"
              type="number"
              id="hours"
              name="hours"
              onChange={handleChange}
              placeholder="Typical hours per week"
              value={formData.hours}
            />
          </fieldset>
          <p className="auth-form__link" onClick={closeInformationModal}>
            Click here to see less
          </p>
        </>
      )}
      <div className="auth-form__button">
        <Button>Sign Up</Button>
      </div>
      {errorMessage && <p className="auth-form__error">{errorMessage}</p>}
      {successMessage && (
        <p className="auth-form__text auth-form__text--success">
          Successful! Directing you to the log in page.
        </p>
      )}
    </form>
  );
}
