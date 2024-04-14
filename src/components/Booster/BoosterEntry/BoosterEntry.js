import { useState, useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import DeleteBoosterModal from "../DeleteBoosterModal";
import EditBoosterModal from "../EditBoosterModal";
import edit from "../../../assets/icons/edit.png";
import deleteIcon from "../../../assets/icons/delete.png";
import "./BoosterEntry.scss";

export default function BoosterEntry({ id, activity, getBoosterEntries }) {
  const { darkTheme } = useContext(ThemeContext);
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
      <article
        className={`booster-entry ${darkTheme ? "booster-entry--dark" : ""}`}
      >
        <h3
          className={`booster-entry__subheading ${
            darkTheme ? "booster-entry__subheading--dark" : ""
          }`}
        >
          {activity}
        </h3>
        <div className="booster-entry__icons">
          <img
            src={edit}
            alt="Edit Icon"
            className="booster-entry__icon"
            onClick={handleEditModal}
          />
          <img
            src={deleteIcon}
            alt="Delete Icon"
            className="booster-entry__icon"
            onClick={handleDeleteModal}
          />
        </div>
      </article>
      {isEditModalOpen && (
        <EditBoosterModal
          id={id}
          closeEditModal={closeEditModal}
          getBoosterEntries={getBoosterEntries}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteBoosterModal
          id={id}
          closeDeleteModal={closeDeleteModal}
          getBoosterEntries={getBoosterEntries}
        />
      )}
    </>
  );
}
