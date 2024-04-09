import { useState } from "react";
import DeleteBoosterModal from "../DeleteBoosterModal";
import edit from "../../assets/icons/edit-25.png";
import deleteIcon from "../../assets/icons/delete-25.png";


export default function BoosterEntry({
  id,
  activity,
  getBoosterEntries,
  darkTheme,
}) {
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
        <p
          className={`entry__subheading ${
            darkTheme ? "entry__subheading--dark" : ""
          }`}
        >
          {activity}
        </p>
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
      {/* {isEditModalOpen && (
        <EditBoosterModal
          id={id}
          closeEditModal={closeEditModal}
          getBoosterEntries={getBoosterEntries}
          darkTheme={darkTheme}
        />
      )} */}
      {isDeleteModalOpen && (
        <DeleteBoosterModal
          id={id}
          darkTheme={darkTheme}
          closeDeleteModal={closeDeleteModal}
          getBoosterEntries={getBoosterEntries}
        />
      )}
    </>
  );
}
