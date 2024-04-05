import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import Navigation from "../../components/Navigation/Navigation";
import SignsBurnOut from "../../components/SignsBurnOut/SignsBurnOut";
import JournalForm from "../../components/JournalForm/JournalForm";
import JournalEntries from "../../components/JournalEntries/JournalEntries";
import add from "../../assets/icons/add-50.png";
import "./JournalPage.scss";

export default function JournalPage({ setIsLoggedIn, isLoggedIn }) {
  const [darkTheme, setDarkTheme] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

  const handleAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      {!isLoggedIn && <LogInMessage />}
      <>
        <Navigation
          handleLogout={handleLogout}
          darkTheme={darkTheme}
          handleTheme={handleTheme}
        />
        <main className={`journal ${darkTheme ? "journal--dark" : ""}`}>
          <div className="journal__container">
            <h1
              className={`journal__heading ${
                darkTheme ? "journal__heading--dark" : ""
              }`}
            >
              How are you feeling today?
            </h1>
            <SignsBurnOut darkTheme={darkTheme} />
            <div
              className={`journal__add ${
                darkTheme ? "journal__add--dark" : ""
              }`}
              onClick={handleAddModal}
            >
              <h2
                className={`journal__subheading ${
                  darkTheme ? "journal__subheading--dark" : ""
                }`}
              >
                Add your daily journal entry
              </h2>
              <img src={add} alt="Add Icon" className="journal__icon" />
            </div>
              {isAddModalOpen && (
                <JournalForm
                  closeAddModal={closeAddModal}
                  darkTheme={darkTheme}
                />
              )}
            <JournalEntries  darkTheme={darkTheme}/>
          </div>
        </main>
      </>
    </>
  );
}
