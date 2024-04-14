import { useState, useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import DeleteJournalModal from "../DeleteJournalModal";
import EditJournalModal from "../EditJournalModal";
import edit from "../../../assets/icons/edit.png";
import deleteIcon from "../../../assets/icons/delete.png";
import "./JournalEntry.scss";

export default function JournalEntry({
  id,
  timestamp,
  entry,
  gratitude,
  getJournalEntries,
}) {
  const { darkTheme } = useContext(ThemeContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const formattedDate = new Date(timestamp).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

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
      <article
        className={`journal-entry ${darkTheme ? "journal-entry--dark" : ""}`}
      >
        <p
          className={`journal-entry__date ${
            darkTheme ? "journal-entry__date--dark" : ""
          }`}
        >
          {formattedDate}
        </p>
        <p
          className={`journal-entry__text ${
            darkTheme ? "journal-entry__text--dark" : ""
          }`}
        >
          {entry}
        </p>
        <h3
          className={`journal-entry__subheading ${
            darkTheme ? "journal-entry__subheading--dark" : ""
          }`}
        >
          Gratitude
        </h3>
        <p
          className={`journal-entry__text ${
            darkTheme ? "journal-entry__text--dark" : ""
          }`}
        >
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
        />
      )}
      {isDeleteModalOpen && (
        <DeleteJournalModal
          id={id}
          closeDeleteModal={closeDeleteModal}
          getJournalEntries={getJournalEntries}
        />
      )}
    </>
  );
}
