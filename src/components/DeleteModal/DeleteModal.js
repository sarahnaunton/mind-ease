import Button from "../Button/Button";
import close from "../../assets/icons/close-25.png";
import "./DeleteModal.scss";

export default function DeleteModal({id, closeDeleteModal, handleDeleteJournal, darkTheme}) {

  return (
    <div className="overlay">
      <section className={`delete ${darkTheme ? "delete--dark" : ""}`}>
        <img src={close} alt="Close Icon" className="delete__icon" onClick={closeDeleteModal}/>
        <h1 className={`delete__heading ${darkTheme ? "delete__heading--dark" : ""}`}>Deleting journal entry</h1>
        <p className={`delete__text ${darkTheme ? "delete__text--dark" : ""}`}>
          Please confirm you would like to delete this entry from your journal.
          You won't be able to undo this action.
        </p>
        <div onClick={() => {handleDeleteJournal(id);}} className="delete__button">
        <Button darkTheme={darkTheme}>Delete</Button>
        </div>
      </section>
    </div>
  );
}
