import axios from "axios";
import { useEffect, useState, useContext, useCallback } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Button from "../Button/Button";
import close from "../../assets/icons/close.png";

export default function EditJournalModal({
  id,
  closeEditModal,
  getJournalEntries,
}) {
  const { darkTheme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    entry: "",
    gratitude: "",
  });
  const [formError, setFormError] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const getJournalEntry = useCallback(async () => {
    const authToken = localStorage.getItem("authToken");
    setErrorMessage(false);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/journals/${id}`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      setFormData({ entry: data.entry, gratitude: data.gratitude });
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  },[id]);

  useEffect(() => {
    getJournalEntry();
  }, [id, getJournalEntry]);

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

    if (!formData.entry || !formData.gratitude) {
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
      setSuccessMessage(true);
      closeEditModal();
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className="overlay">
      <form
        className={`form ${darkTheme ? "form--dark" : ""}`}
        onSubmit={(event) => {
          handleForm(event, id);
        }}
      >
        <img
          src={close}
          alt="Close Icon"
          onClick={closeEditModal}
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
            value={formData.entry}
            onChange={handleChange}
          ></textarea>
        </fieldset>
        {formError.form && <p className="form__error">{formError.form}</p>}
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
            value={formData.gratitude}
            onChange={handleChange}
          ></textarea>
        </fieldset>
        {formError.form && <p className="form__error">{formError.form}</p>}
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
