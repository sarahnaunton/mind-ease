import { useState } from "react";
import axios from "axios";
import Button from "../components/Button/Button";
import close from "../assets/icons/close-25.png";

export default function DeleteBoosterModal({
  id,
  darkTheme,
  closeDeleteModal,
  getBoosterEntries,
}) {
  const [errorMessage, setErrorMessage] = useState(false);

  const handleDeleteBooster = async () => {
    const authToken = localStorage.getItem("authToken");
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
      closeDeleteModal();
      getBoosterEntries();
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className="overlay">
      <section className={`delete ${darkTheme ? "delete--dark" : ""}`}>
        <img
          src={close}
          alt="Close Icon"
          className="delete__icon"
          onClick={closeDeleteModal}
        />
        <h1
          className={`delete__heading ${
            darkTheme ? "delete__heading--dark" : ""
          }`}
        >
          Deleting mood booster
        </h1>
        <p className={`delete__text ${darkTheme ? "delete__text--dark" : ""}`}>
          Please confirm you would like to delete this mood booster. You won't
          be able to undo this action.
        </p>
        <div
          onClick={() => {
            handleDeleteBooster(id);
          }}
          className="delete__button"
        >
          <Button darkTheme={darkTheme}>Delete</Button>
        </div>
        {errorMessage && <p className="delete__error">{errorMessage}</p>}
      </section>
    </div>
  );
}
