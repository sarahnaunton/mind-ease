import axios from "axios";
import { useEffect, useState } from "react";
import Button from "./Button/Button";
import close from "../assets/icons/close-25.png";
import "./JournalForm/JournalForm.scss";

export default function EditModal({
  id,
  closeEditModal,
  darkTheme,
  getJournalEntries,
}) {
  const [formData, setFormData] = useState({
    entry: "",
    gratitude: "",
  });
  const [formError, setFormError] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const getJournalEntry = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/journals/${id}`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      setFormData({entry: data.entry, gratitude: data.gratitude })
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJournalEntry();
  },[id])

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleForm = async (event) => {
    const authToken = localStorage.getItem("authToken");

    event.preventDefault();
    setFormSubmitted(false);

    let formValid = true;
    const error = {};

    if (!formData.entry && !formData.gratitude) {
      formValid = false;
      error.form =
        "Please edit either your journal entry or gratitude, or both";
    }

    if (!formValid) {
      setFormError(error);
      return;
    }

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/journals/${id}`,
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
      closeEditModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overlay">
      <form
        className={`journal-form ${darkTheme ? "journal-form--dark" : ""}`}
        onSubmit={(event) => {
          handleForm(event, id);
        }}
      >
        <img
          src={close}
          alt="Close Icon"
          onClick={closeEditModal}
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
        {formError.form && (
          <p className="journal-form__error">{formError.form}</p>
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
        {formError.form && (
          <p className="journal-form__error">{formError.form}</p>
        )}
        <div className="journal-form__button">
          <Button darkTheme={darkTheme}>Submit</Button>
        </div>
        {errorMessage && (
          <p className="journal-form__error">
            {" "}
            Something went wrong, please try again later.
          </p>
        )}
        {successMessage && (
          <p
            className={`journal-form__success ${
              darkTheme ? "journal-form__sucess--dark" : ""
            }`}
          >
            {" "}
            Successful!
          </p>
        )}
      </form>
    </div>
  );
}
