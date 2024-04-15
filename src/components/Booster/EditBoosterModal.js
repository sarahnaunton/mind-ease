import axios from "axios";
import { useEffect, useState, useContext, useCallback } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Button from "../Button/Button";
import close from "../../assets/icons/close.png";

export default function EditBoosterModal({
  id,
  closeEditModal,
  getBoosterEntries,
}) {
  const { darkTheme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    activity: "",
  });
  const [formError, setFormError] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const getBoosterEntry = useCallback(async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/activities/${id}`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      setFormData({ activity: data.activity });
      setErrorMessage(false);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  },[id]);

  useEffect(() => {
    getBoosterEntry();
  }, [id, getBoosterEntry]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleForm = async (event) => {
    const authToken = localStorage.getItem("authToken");
    event.preventDefault();
    setSuccessMessage(false);
    setErrorMessage(false);
    setFormError({});

    let formValid = true;
    const error = {};

    if (!formData.activity) {
      formValid = false;
      error.activity = "Please edit your mood booster";
    }

    if (!formValid) {
      setFormError(error);
      return;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/activities/${id}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      getBoosterEntries();
      setSuccessMessage(true);
      closeEditModal();
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className="overlay">
      <form
        onSubmit={(event) => {
          handleForm(event, id);
        }}
        className={`form ${darkTheme ? "form--dark" : ""}`}
      >
        <img
          src={close}
          alt="Close Icon"
          onClick={closeEditModal}
          className="form__icon"
        />
        <fieldset className="form__fieldset">
          <label
            htmlFor="booster"
            className={`form__label ${darkTheme ? "form__label--dark" : ""}`}
          >
            What boosts your mood?
          </label>
          <textarea
            id="booster"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            className={`form__input ${darkTheme ? "form__input--dark" : ""}`}
          ></textarea>
        </fieldset>
        {formError.activity && (
          <p className="form__error">{formError.activity}</p>
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
