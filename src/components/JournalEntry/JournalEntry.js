import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal";
import edit from "../../assets/icons/edit-25.png";
import deleteIcon from "../../assets/icons/delete-25.png";
import "./JournalEntry.scss";

export default function JournalEntry({
  id,
  timestamp,
  entry,
  gratitude,
  getJournalEntries,
  darkTheme,
}) {
  const formattedDate = new Date(timestamp).toLocaleDateString("en-GB");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <article className={`entry ${darkTheme ? "entry--dark" : ""}`}>
        <div className="entry__row">
          <p className={`entry__subheading ${darkTheme ? "entry__subheading--dark" : ""}`}>Entry</p>
          <p className={`entry__date ${darkTheme ? "entry__date--dark" : ""}`}>{formattedDate}</p>
        </div>
        <p className={`entry__text ${darkTheme ? "entry__text--dark" : ""}`}>{entry}</p>
        <p className={`entry__subheading ${darkTheme ? "entry__subheading--dark" : ""}`}>Gratitude</p>
        <p className={`entry__text ${darkTheme ? "entry__text--dark" : ""}`}>{gratitude}</p>
        <div className="entry__icons">
          <img
            src={edit}
            alt="Edit Icon"
            className="entry__icon"
            onClick={handleEditModal}
          />
          <img
            src={deleteIcon}
            alt="Delete Icon"
            className="entry__icon"
            onClick={handleDeleteModal}
          />
        </div>
      </article>
      {isEditModalOpen && (
        <EditModal
          id={id}
          closeEditModal={closeEditModal}
          getJournalEntries={getJournalEntries}
          darkTheme={darkTheme}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          id={id}
          darkTheme={darkTheme}
          closeDeleteModal={closeDeleteModal}
          getJournalEntries={getJournalEntries}
        />
      )}
    </>
  );
}
