import { useEffect, useState } from "react";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import Navigation from "../../components/Navigation/Navigation";
import MoodGraph from "../../components/MoodGraph/MoodGraph";

export default function MoodGraphPage({ setIsLoggedIn, isLoggedIn }) {
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
  return (
    <>
      {/* {!isLoggedIn && <LogInMessage />} */}
      {isLoggedIn && (
        <>
          <Navigation
            handleLogout={handleLogout}
            darkTheme={darkTheme}
            handleTheme={handleTheme}
          />
          <main className={`graph-page ${darkTheme ? "graph-page--dark" : ""}`}>
            <div className="graph-page__container">
              <h1
                className={`graph-page__heading ${
                  darkTheme ? "graph-page__heading--dark" : ""
                }`}
              >
                See your scores
              </h1>
              <p
                className={`graph-page__text ${
                  darkTheme ? "graph-page__text--dark" : ""
                }`}
              >
                This is a graph showing your scores from the Oldenburg Burnout Inventory 
              </p>
            </div>
            <MoodGraph/>
          </main>
        </>
      )}
    </>
  );
}
