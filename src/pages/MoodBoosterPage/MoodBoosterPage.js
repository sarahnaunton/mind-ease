import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";
import { ChartContext } from "../../contexts/ChartContext";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import Navigation from "../../components/Navigation/Navigation";
import DailyBooster from "../../components/DailyBooster/DailyBooster";
import BoosterForm from "../../components/BoosterForm/BoosterForm";
import BoosterEntries from "../../components/BoosterEntries";
import RecommendAI from "../../components/RecommendAI/RecommendAI";
import HappyResources from "../../components/HappyResouces";
import add from "../../assets/icons/add-50.png";
import "./MoodBoosterPage.scss";

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
      {isLoggedIn && (
        <>
          <Navigation />
          <main className={`booster ${darkTheme ? "booster--dark" : ""}`}>
            <div className="booster__container">
              <h1
                className={`booster__heading ${
                  darkTheme ? "booster__heading--dark" : ""
                }`}
              >
                What makes you happy?
              </h1>
              <p
                className={`booster__text ${
                  darkTheme ? "booster__text--dark" : ""
                }`}
              >
                This page is where we celebrate the simple joys that brighten
                our days.
              </p>
              <p
                className={`booster__text ${
                  darkTheme ? "booster__text--dark" : ""
                }`}
              >
                In times of burnout, it's especially crucial to have a curated
                list of activities that bring us joy. Even when we're least
                inclined to engage in them, these mood boosters can serve as
                helpful prompts, gently nudging us back towards a state of
                balance and contentment.
              </p>
              <p
                className={`booster__text ${
                  darkTheme ? "booster__text--dark" : ""
                }`}
              >
                These boosters can encompass a variety of activities, ranging
                from the calming practice of yoga to the peacefulness of a
                nature walk, or even the immersion of a good book.
              </p>
              {boosterEntries && boosterEntries.length > 0 && (
                <DailyBooster boosterEntries={boosterEntries} />
              )}
              <div
                onClick={handleAddModal}
                className={`booster__add ${
                  darkTheme ? "booster__add--dark" : ""
                }`}
              >
                <h2
                  className={`booster__subheading ${
                    darkTheme ? "booster__subheading--dark" : ""
                  }`}
                >
                  Add a mood booster
                </h2>
                <img src={add} alt="Add Icon" className="booster__icon" />
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
              {errorMessage && <p className="booster__error">{errorMessage}</p>}
            </div>
          </main>
        </>
      )}
    </>
  );
}
