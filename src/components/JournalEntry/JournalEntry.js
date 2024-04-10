import { useState } from "react";
import DeleteJournalModal from "../DeleteJournalModal/DeleteJournalModal";
import EditJournalModal from "../EditJournalModal";
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
  const formattedDate = new Date(timestamp).toLocaleDateString("en-GB", { day: "numeric", month: "numeric", year:"numeric"})
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
      <article className={`journal-entry ${darkTheme ? "entry--dark" : ""}`}>
        <div className="journal-entry__row">
          <p
            className={`journal-entry__subheading ${
              darkTheme ? "journal-entry__subheading--dark" : ""
            }`}
          >
            Entry
          </p>
          <p className={`journal-entry__date ${darkTheme ? "journal-entry__date--dark" : ""}`}>
            {formattedDate}
          </p>
        </div>
        <p className={`journal-entry__text ${darkTheme ? "journal-entry__text--dark" : ""}`}>
          {entry}
        </p>
        <p
          className={`journal-entry__subheading ${
            darkTheme ? "journal-entry__subheading--dark" : ""
          }`}
        >
          Gratitude
        </p>
        <p className={`journal-entry__text ${darkTheme ? "journal-entry__text--dark" : ""}`}>
          {gratitude}
        </p>
        <div className="journal-entry__icons">
          <img
            src={edit}
            alt="Edit Icon"
            className="journal-entry__icon"
            onClick={handleEditModal}
          />
          <img
            src={deleteIcon}
            alt="Delete Icon"
            className="journal-entry__icon"
            onClick={handleDeleteModal}
          />
        </div>
      </article>
      {isEditModalOpen && (
        <EditJournalModal
          id={id}
          closeEditModal={closeEditModal}
          getJournalEntries={getJournalEntries}
          darkTheme={darkTheme}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteJournalModal
          id={id}
          darkTheme={darkTheme}
          closeDeleteModal={closeDeleteModal}
          getJournalEntries={getJournalEntries}
        />
      )}
    </>
  );
}
