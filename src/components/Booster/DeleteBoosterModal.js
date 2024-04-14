import axios from "axios";
import { useState, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Button from "../Button/Button";
import close from "../../assets/icons/close.png";

export default function DeleteBoosterModal({
  id,
  closeDeleteModal,
  getBoosterEntries,
}) {
  const { darkTheme } = useContext(ThemeContext);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleDeleteBooster = async () => {
    const authToken = localStorage.getItem("authToken");
    setSuccessMessage(false);
    setErrorMessage(false);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/activities/${id}`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      setSuccessMessage(true);
      closeDeleteModal();
      getBoosterEntries();
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className="overlay">
      <section className={`form ${darkTheme ? "form--dark" : ""}`}>
        <img
          src={close}
          alt="Close Icon"
          className="form__icon"
          onClick={closeDeleteModal}
        />
        <h2 className={`form__label ${darkTheme ? "form__label--dark" : ""}`}>
          Deleting mood booster
        </h2>
        <p className={`form__text ${darkTheme ? "form__text--dark" : ""}`}>
          Please confirm you would like to delete this mood booster. You won't
          be able to undo this action.
        </p>
        <div
          onClick={() => {
            handleDeleteBooster(id);
          }}
          className="form__button"
        >
          <Button>Delete</Button>
        </div>
        {errorMessage && <p className="form__error">{errorMessage}</p>}
        {successMessage && (
          <p
            className={`form__success ${darkTheme ? "form__sucess--dark" : ""}`}
          >
            Successful!
          </p>
        )}
      </section>
    </div>
  );
}
