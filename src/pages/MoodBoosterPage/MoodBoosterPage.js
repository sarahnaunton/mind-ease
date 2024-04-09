import { useEffect, useState } from "react";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import Navigation from "../../components/Navigation/Navigation";
import BoosterForm from "../../components/BoosterForm/BoosterForm";
import add from "../../assets/icons/add-50.png";
import "./MoodBoosterPage.scss";

export default function MoodBoosterPage({
  isLoggedIn,
  handleLogout,
  handleTheme,
  darkTheme,
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
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
          <Navigation
            handleLogout={handleLogout}
            darkTheme={darkTheme}
            handleTheme={handleTheme}
          />
          <main className={`booster ${darkTheme ? "booster--dark" : ""}`}>
            <div className="booster__container">
              <h1 className={`booster__heading ${darkTheme ? "booster__heading--dark" : ""}`}>What makes you happy?</h1>
              <p className={`booster__text ${darkTheme ? "booster__text--dark" : ""}`}>Description of the page</p>
              <div onClick={handleAddModal} className={`booster__add ${darkTheme ? "booster__add--dark" : ""}`}>
                <h2 className={`booster__subheading ${darkTheme ? "booster__subheading--dark" : ""}`}>Add a mood booster</h2>
                <img src={add} alt="Add Icon" className="booster__icon"/>
              </div>
              {isAddModalOpen && (
                <BoosterForm
                  closeAddModal={closeAddModal}
                  darkTheme={darkTheme}
                />
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
}
