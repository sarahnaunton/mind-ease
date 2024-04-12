import axios from "axios";
import { useState, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Button from "../Button/Button";
import close from "../../assets/icons/close-25.png";
import "./DeleteJournalModal.scss";

export default function DeleteJournalModal({
  id,
  closeDeleteModal,
  getJournalEntries,
}) {
  const { darkTheme } = useContext(ThemeContext);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleDeleteJournal = async () => {
    const authToken = localStorage.getItem("authToken");
    setErrorMessage(false);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/journals/${id}`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      closeDeleteModal();
      getJournalEntries();
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
          Deleting journal entry
        </h1>
        <p className={`delete__text ${darkTheme ? "delete__text--dark" : ""}`}>
          Please confirm you would like to delete this entry from your journal.
        </p>
        <p className={`delete__text ${darkTheme ? "delete__text--dark" : ""}`}>
          {" "}
          You won't be able to undo this action.
        </p>
        <div
          onClick={() => {
            handleDeleteJournal(id);
          }}
          className="delete__button"
        >
          <Button>Delete</Button>
        </div>
        {errorMessage && <p className="delete__error">{errorMessage}</p>}
      </section>
    </div>
  );
}
