import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import Navigation from "../../components/Navigation/Navigation";
import JournalIntroduction from "../../components/Journal/JournalIntroduction";
import BurnOutSigns from "../../components/BurnOut/BurnOutSigns";
import JournalForm from "../../components/Journal/JournalForm/JournalForm";
import JournalEntries from "../../components/Journal/JournalEntries/JournalEntries";
import add from "../../assets/icons/add.png";
import "./JournalPage.scss";

export default function JournalPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const { darkTheme } = useContext(ThemeContext);
  const [journalEntries, setJournalEntries] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    getJournalEntries();
    window.scrollTo(0, 0);
  }, []);

  const getJournalEntries = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/journals`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      setJournalEntries(data);
      setErrorMessage(false);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  const handleAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      {!isLoggedIn && <LogInMessage />}
      {isLoggedIn && (
        <>
          <Navigation />
          <main className={`page ${darkTheme ? "page--dark" : ""}`}>
            <div className="page__container">
              <h1
                className={`page__heading ${
                  darkTheme ? "page__heading--dark" : ""
                }`}
              >
                What's on your mind?
              </h1>
              <JournalIntroduction />
              <div
                className={`page__information page__information--blue ${
                  darkTheme ? "page__information--blue--dark" : ""
                }`}
              >
                <BurnOutSigns />
              </div>
              <div
                className={`page__add ${darkTheme ? "page__add--dark" : ""}`}
                onClick={handleAddModal}
              >
                <h2
                  className={`page__label ${
                    darkTheme ? "page__label--dark" : ""
                  }`}
                >
                  Add your daily journal entry
                </h2>
                <img className="page__icon" src={add} alt="Add Icon" />
              </div>
              {isAddModalOpen && (
                <JournalForm
                  closeAddModal={closeAddModal}
                  getJournalEntries={getJournalEntries}
                />
              )}
              <JournalEntries
                getJournalEntries={getJournalEntries}
                journalEntries={journalEntries}
              />
              {errorMessage && <p className="page__error">{errorMessage}</p>}
            </div>
          </main>
        </>
      )}
    </>
  );
}
