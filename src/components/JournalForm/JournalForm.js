import { useState, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import axios from "axios";
import Button from "../Button/Button";
import close from "../../assets/icons/close-25.png";
import "./JournalForm.scss";

export default function JournalForm({ getJournalEntries, closeAddModal }) {
  const [formData, setFormData] = useState({
    entry: "",
    gratitude: "",
  });
  const { darkTheme } = useContext(ThemeContext);

  const [formError, setFormError] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleForm = async (event) => {
    const authToken = localStorage.getItem("authToken");

    event.preventDefault();
    setFormSubmitted(false);
    setErrorMessage(false);
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
      setErrorMessage(false);
      setSuccessMessage(true);
      setFormSubmitted(true);
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
        className={`journal-form ${darkTheme ? "journal-form--dark" : ""}`}
        onSubmit={handleForm}
      >
        <img
          src={close}
          alt="Close Icon"
          onClick={closeAddModal}
          className="journal-form__icon"
        />
        <fieldset className="journal-form__fieldset">
          <label
            className={`journal-form__label ${
              darkTheme ? "journal-form__label--dark" : ""
            }`}
            htmlFor="entry"
          >
            Take a moment to describe your thoughts, feelings and experiences.
          </label>
          <textarea
            className={`journal-form__input ${
              darkTheme ? "journal-form__input--dark" : ""
            }`}
            name="entry"
            id="entry"
            value={formData.entry}
            onChange={handleChange}
          ></textarea>
        </fieldset>
        {formError.entry && (
          <p className="journal-form__error">{formError.entry}</p>
        )}
        <fieldset className="journal-form__fieldset">
          <label
            className={`journal-form__label ${
              darkTheme ? "journal-form__label--dark" : ""
            }`}
            htmlFor="gratitude"
          >
            Reflect on something you're grateful for today.
          </label>
          <textarea
            className={`journal-form__input journal-form__input--height ${
              darkTheme ? "journal-form__input--dark" : ""
            }`}
            name="gratitude"
            id="gratitude"
            value={formData.gratitude}
            onChange={handleChange}
          ></textarea>
        </fieldset>
        {formError.gratitude && (
          <p className="journal-form__error">{formError.gratitude}</p>
        )}
        <div className="journal-form__button">
          <Button>Submit</Button>
        </div>
        {errorMessage && <p className="journal-form__error">{errorMessage}</p>}
        {successMessage && (
          <p
            className={`journal-form__success ${
              darkTheme ? "journal-form__sucess--dark" : ""
            }`}
          >
            Successful!
          </p>
        )}
      </form>
    </div>
  );
}
