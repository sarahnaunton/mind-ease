import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
      setErrorMessage(false);
      setSuccessMessage(true);
      setFormSubmitted(true);
      setIsLoggedIn(true);
      setFormData({
        email: "",
        password: "",
      });
      getUserData();
      navigate("/home");
    } catch (error) {
        console.log(error)
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <form className="form" onSubmit={handleForm}>
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
          <p className="form__error">{formError.password}</p>
        </fieldset>
      )}
      <div className="form__button">
        <Button>Log In</Button>
      </div>
      {errorMessage && <p className="form__error">{errorMessage}</p>}
      {successMessage && (
        <p className="form__text form__text--success">
          Successful! Directing you to the log in page.
        </p>
      )}
    </form>
  );
}
