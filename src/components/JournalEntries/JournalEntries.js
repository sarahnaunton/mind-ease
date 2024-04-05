import { useState } from "react";
import edit from "../../assets/icons/edit-25.png";
import deleteIcon from "../../assets/icons/delete-25.png";
import "./JournalEntries.scss";
import DeleteModal from "../DeleteModal/DeleteModal";


export default function JournalEntries({darkTheme}) {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteModal = () => {
        setIsDeleteModalOpen(true);
      };
    
      const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
      };

  return (
    <>
    <section className="entries">
      <h2 className="entries__heading">Your previous journal entries</h2>
      <div className="entries__entry">
        <article className="entry">
          <p className="entry__subheading">Date</p>
          <p className="entry__text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Accusantium repellendus reprehenderit natus quasi exercitationem
            modi necessitatibus aliquid repellat architecto impedit vero
            dolorem, voluptatum omnis, minima tempora quaerat. Voluptas,
            laudantium atque.
          </p>
          <p className="entry__subheading">Gratitude</p>
          <p className="entry__text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores
            mollitia corporis saepe, cumque libero, culpa suscipit dolor
            assumenda provident iste enim numquam voluptatibus exercitationem,
            aperiam perspiciatis? Quaerat nobis iste tempora.
          </p>
          <div className="entry__icons">
            <img src={edit} alt="Edit Icon" className="entry__icon" />
            <img src={deleteIcon} alt="Delete Icon" className="entry__icon" onClick={handleDeleteModal} />
          </div>
        </article>
      </div>
      <p className="entries__link">Click here to see more</p>
      <p className="entries__link">Click here to see less</p>
    </section>
        {isDeleteModalOpen && 
        <DeleteModal  darkTheme={darkTheme} closeDeleteModal={closeDeleteModal}/>}
    </>
  );
}
