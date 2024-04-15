import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";

export default function LogInForm() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { getUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleForm = async (event) => {
    event.preventDefault();
    setSuccessMessage(false);
    setErrorMessage(false);
    setFormError({});

    let formValid = true;
    const error = {};

    if (!formData.email) {
      formValid = false;
      error.email = "Please enter your email";
    }

    if (!formData.password) {
      formValid = false;
      error.password = "Please enter your password";
    }

    if (!formValid) {
      setFormError(error);
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/login`,
        formData
      );
      localStorage.setItem("authToken", data.authToken);
      setSuccessMessage(true);
      setIsLoggedIn(true);
      setFormData({
        email: "",
        password: "",
      });
      getUserData();
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleForm}>
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
      <div className="auth-form__button">
        <Button>Log In</Button>
      </div>
      {errorMessage && <p className="auth-form__error">{errorMessage}</p>}
      {successMessage && (
        <p className="auth-form__text auth-form__text--success">
          Successful! Directing you to the home page.
        </p>
      )}
    </form>
  );
}
