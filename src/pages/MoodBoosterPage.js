import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";
import { ChartContext } from "../contexts/ChartContext";
import LogInMessage from "../components/LogInMessage/LogInMessage";
import Loader from "../components/Loader/Loader";
import Navigation from "../components/Navigation/Navigation";
import DailyBooster from "../components/DailyBooster/DailyBooster";
import BoosterForm from "../components/BoosterForm/BoosterForm";
import BoosterEntries from "../components/BoosterEntries";
import RecommendAI from "../components/RecommendAI/RecommendAI";
import HappyResources from "../components/HappyResouces";
import face from "../assets/icons/face.png";
import add from "../assets/icons/add-50.png";

export default function MoodBoosterPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const { darkTheme } = useContext(ThemeContext);
  const { userData } = useContext(UserContext);
  const { chartData } = useContext(ChartContext);
  const [boosterEntries, setBoosterEntries] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const getBoosterEntries = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/activities`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      setBoosterEntries(data);
      setErrorMessage(false);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  useEffect(() => {
    getBoosterEntries();
    window.scrollTo(0, 0);
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
      {isLoggedIn && !boosterEntries && <Loader />}
      {isLoggedIn && boosterEntries && (
        <>
          <Navigation />
          <main className={`page ${darkTheme ? "page--dark" : ""}`}>
            <div className="page__container">
              <h1
                className={`page__heading ${
                  darkTheme ? "page__heading--dark" : ""
                }`}
              >
                What makes you happy?
              </h1>
              <div>
                <p
                  className={`page__text ${
                    darkTheme ? "page__text--dark" : ""
                  }`}
                >
                  This page is where you can celebrate the simple joys that
                  brighten your day.{" "}
                  <img src={face} alt="Smile Icon" className="page__icon" />
                </p>
                <p
                  className={`page__text ${
                    darkTheme ? "page__text--dark" : ""
                  }`}
                >
                  In times of burnout, it's especially important to have a
                  mindful list of activities that bring us joy. Even when we're
                  least inclined to engage in them, these mood boosters can
                  serve as helpful prompts, gently nudging us back towards a
                  state of balance and wellbeing.
                </p>
                <p
                  className={`page__text ${
                    darkTheme ? "page__text--dark" : ""
                  }`}
                >
                  These boosters can encompass a variety of activities, ranging
                  from the calming practice of yoga to the peacefulness of a
                  nature walk, or even the immersion of a good book. Ultimately,
                  the choice is yours.
                </p>
              </div>
              {boosterEntries && boosterEntries.length > 0 && (
                <DailyBooster boosterEntries={boosterEntries} />
              )}
              <div
                onClick={handleAddModal}
                className={`page__add ${
                  darkTheme ? "page__add--dark" : ""
                }`}
              >
                <h2
                  className={`page__label ${
                    darkTheme ? "page__label--dark" : ""
                  }`}
                >
                  Add a mood booster
                </h2>
                <img src={add} alt="Add Icon" className="page__icon" />
              </div>
              {isAddModalOpen && (
                <BoosterForm
                  closeAddModal={closeAddModal}
                  getBoosterEntries={getBoosterEntries}
                />
              )}
              <BoosterEntries
                getBoosterEntries={getBoosterEntries}
                boosterEntries={boosterEntries}
              />
              {boosterEntries && userData && chartData && (
                <RecommendAI
                  boosterEntries={boosterEntries}
                  userData={userData}
                  chartData={chartData}
                />
              )}
              <HappyResources />
              {errorMessage && <p className="page__error">{errorMessage}</p>}
            </div>
          </main>
        </>
      )}
    </>
  );
}
