import axios from "axios";
import { useState, useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Button from "../../Button/Button";
import close from "../../../assets/icons/close.png";
import "./JournalForm.scss";

export default function JournalForm({ getJournalEntries, closeAddModal }) {
  const { darkTheme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    entry: "",
    gratitude: "",
  });
  const [formError, setFormError] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleForm = async (event) => {
    const authToken = localStorage.getItem("authToken");
    event.preventDefault();
    setErrorMessage(false);
    setSuccessMessage(false);
    setFormError({});

    let formValid = true;
    const error = {};

    if (!formData.entry) {
      formValid = false;
      error.entry = "Please enter your journal entry";
    }

    if (!formData.gratitude) {
      formValid = false;
      error.gratitude = "Please enter your daily gratitude";
    }

    if (!formValid) {
      setFormError(error);
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/journals`,
        formData,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      getJournalEntries();
      setSuccessMessage(true);
      setFormData({
        entry: "",
        gratitude: "",
      });
      closeAddModal();
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className="overlay">
      <form
        className={`form ${darkTheme ? "form--dark" : ""}`}
        onSubmit={handleForm}
      >
        <img
          src={close}
          alt="Close Icon"
          onClick={closeAddModal}
          className="form__icon"
        />
        <fieldset className="form__fieldset">
          <label
            className={`form__label ${darkTheme ? "form__label--dark" : ""}`}
            htmlFor="entry"
          >
            Take a moment to describe your thoughts, feelings and experiences.
          </label>
          <textarea
            className={`form__input form__input--height ${
              darkTheme ? "form__input--dark" : ""
            }`}
            name="entry"
            id="entry"
            placeholder="Type your journal entry here"
            value={formData.entry}
            onChange={handleChange}
          ></textarea>
        </fieldset>
        {formError.entry && <p className="form__error">{formError.entry}</p>}
        <fieldset className="form__fieldset">
          <label
            className={`form__label ${darkTheme ? "form__label--dark" : ""}`}
            htmlFor="gratitude"
          >
            Reflect on something you're grateful for today.
          </label>
          <textarea
            className={`form__input ${darkTheme ? "form__input--dark" : ""}`}
            name="gratitude"
            id="gratitude"
            placeholder="Type your gratitude here"
            value={formData.gratitude}
            onChange={handleChange}
          ></textarea>
        </fieldset>
        {formError.gratitude && (
          <p className="form__error">{formError.gratitude}</p>
        )}
        <div className="form__button">
          <Button>Submit</Button>
        </div>
        {errorMessage && <p className="form__error">{errorMessage}</p>}
        {successMessage && (
          <p
            className={`form__success ${darkTheme ? "form__sucess--dark" : ""}`}
          >
            Successful!
          </p>
        )}
      </form>
    </div>
  );
}
