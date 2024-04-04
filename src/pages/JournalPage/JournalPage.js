import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import JournalForm from "../../components/JournalForm/JournalForm";
import add from "../../assets/icons/add-50.png";
import "./JournalPage.scss";

export default function JournalPage({ setIsLoggedIn, isLoggedIn }) {
  const [darkTheme, setDarkTheme] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  const handleTheme = () => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
    localStorage.setItem("theme", JSON.stringify(!darkTheme));
  };

  useEffect(() => {
    const themeJSON = localStorage.getItem("theme");
    if (themeJSON) {
      setDarkTheme(JSON.parse(themeJSON));
    }
  }, []);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      {!isLoggedIn && (
        <section className="login-message">
          <div className="login-message__container">
            <p className="login-message__text">
              To view this page, you must be logged in.{" "}
              <span>
                {" "}
                <Link to="/log-in" className="login-message__link">
                  Click here to log in
                </Link>
              </span>
            </p>
          </div>
        </section>
      )}
      <>
        <Navigation
          handleLogout={handleLogout}
          darkTheme={darkTheme}
          handleTheme={handleTheme}
        />
        <main className="journal">
          <div className="journal__container">
            <h1 className="journal__heading">How are you feeling today?</h1>
            <h2 className="journal__subheading">
              What are some of the signs that could mean you are burnt out?
            </h2>
            <ul className="journal__list">
              <li className="journal__item">
                Persistent exhaustion despite adequate rest and sleep
              </li>
              <li className="journal__item">
                Decreased motivation and productivity, including finding it
                challenging to engage fully in tasks you once enjoyed.
              </li>
              <li className="journal__item">
                Emotional detachment towards work and life in general, or
                increased irritability or fustration
              </li>
              <li className="journal__item">
                Physical symptoms like headaches, stomach issues, or frequent
                illnesses may also be signs of burnout, as the body reacts to
                prolonged stress.
              </li>
            </ul>
            <div className="journal__add" onClick={handleAddModal}>
              <h2 className="journal__subheading">
                Add your daily journal entry
              </h2>
              <img src={add} alt="Add Icon" className="journal__icon"/>
            </div>
            <section>{isAddModalOpen && <JournalForm closeAddModal={closeAddModal}  darkTheme={darkTheme}/>}</section>
          </div>
        </main>
      </>
    </>
  );
}
