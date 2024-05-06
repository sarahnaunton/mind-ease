import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";
import { ChartContext } from "../contexts/ChartContext";
import LogInMessage from "../components/LogInMessage/LogInMessage";
import Navigation from "../components/Navigation/Navigation";
import BoosterIntroduction from "../components/Booster/BoosterIntroduction";
import BoosterForm from "../components/Booster/BoosterForm";
import BoosterEntries from "../components/Booster/BoosterEntries";
import BoosterDaily from "../components/Booster/BoosterDaily/BoosterDaily";
import BurnOutManagement from "../components/BurnOut/BurnOutManagement";
import RecommendAI from "../components/Booster/RecommendAI/RecommendAI";
import BoosterResources from "../components/Booster/BoosterResouces";
import add from "../assets/icons/add.png";

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
    setErrorMessage(false);
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
          <main className={`page ${darkTheme ? "page--dark" : ""}`}>
            <div className="page__container">
              <h1
                className={`page__heading ${
                  darkTheme ? "page__heading--dark" : ""
                }`}
              >
                What makes you happy?
              </h1>
              <BoosterIntroduction />
              <div
                onClick={handleAddModal}
                className={`page__add ${darkTheme ? "page__add--dark" : ""}`}
              >
                <h3
                  className={`page__label ${
                    darkTheme ? "page__label--dark" : ""
                  }`}
                >
                  Add a mood booster
                </h3>
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
              {boosterEntries && boosterEntries.length > 0 && (
                <BoosterDaily boosterEntries={boosterEntries} />
              )}
              {boosterEntries && userData && chartData && (
                <RecommendAI
                  boosterEntries={boosterEntries}
                  userData={userData}
                  chartData={chartData}
                />
              )}
              <div
                className={`page__information page__information--orange ${
                  darkTheme ? "page__information--orange--dark" : ""
                }`}
              >
                <BurnOutManagement />
              </div>
              <BoosterResources />
              {errorMessage && <p className="page__error">{errorMessage}</p>}
            </div>
          </main>
        </>
      )}
    </>
  );
}
