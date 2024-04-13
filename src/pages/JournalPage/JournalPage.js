import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import BurnOutSigns from "../../components/BurnOutSigns/BurnOutSigns";
import JournalForm from "../../components/JournalForm/JournalForm";
import JournalEntries from "../../components/JournalEntries/JournalEntries";
import pen from "../../assets/icons/pen.png";
import add from "../../assets/icons/add-50.png";
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
      {isLoggedIn && !journalEntries&& (
<Loader/>
      )
      }
      {isLoggedIn && journalEntries &&(
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
              <div>
                <p
                  className={`page__text ${
                    darkTheme ? "page__text--dark" : ""
                  }`}
                >
                  Welcome to your journaling space, where your thoughts find
                  expression and your emotions are heard. <img src={pen} alt="Pen Icon" className="page__icon"/>
                </p>
                <p
                  className={`page__text ${
                    darkTheme ? "page__text--dark" : ""
                  }`}
                >
                  Journaling offers a unique opportunity to understand yourself
                  better, gain clarity, and encourage personal growth. Through
                  journaling, you can track your progress, celebrate victories,
                  and navigate challenges. Remember, every entry is a step
                  towards self-discovery and empowerment.
                </p>
              </div>
              <BurnOutSigns />
              <div
                className={`page__add ${
                  darkTheme ? "page__add--dark" : ""
                }`}
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
