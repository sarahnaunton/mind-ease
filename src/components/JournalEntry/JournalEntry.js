import { useEffect, useState } from "react";
import axios from "axios";
import DeleteModal from "../DeleteModal/DeleteModal";
import edit from "../../assets/icons/edit-25.png";
import deleteIcon from "../../assets/icons/delete-25.png";
import "./JournalEntry.scss";

export default function JournalEntry({
  id,
  created_at,
  entry,
  gratitude,
  getJournalEntries,
  darkTheme,
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteJournal = async(id) => {
    const authToken = localStorage.getItem("authToken");
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/journals/${id}`, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
      closeDeleteModal();
      getJournalEntries();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <article className="entry">
        <div>
          {/* <p className="entry__subheading">{created_at}</p> */}
          <p className="entry__subheading">Entry</p>
        </div>
        <p className="entry__text">{entry}</p>
        <p className="entry__subheading">Gratitude</p>
        <p className="entry__text">{gratitude}</p>
        <div className="entry__icons">
          <img src={edit} alt="Edit Icon" className="entry__icon" />
          <img
            src={deleteIcon}
            alt="Delete Icon"
            className="entry__icon"
            onClick={handleDeleteModal}
          />
        </div>
      </article>
      {isDeleteModalOpen && (
        <DeleteModal
          id={id}
          darkTheme={darkTheme}
          closeDeleteModal={closeDeleteModal}
          handleDeleteJournal={handleDeleteJournal}
        />
      )}
    </>
  );
}
