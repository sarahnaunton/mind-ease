import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import Navigation from "../../components/Navigation/Navigation";
import HomePageGreeting from "../../components/HomePageGreeting/HomePageGreeting";
import HomePageArticle from "../../components/HomePageArticle/HomePageArticle";
import smile from "../../assets/icons/smile-50.png";
import graph from "../../assets/icons/graph-50.png";
import journal from "../../assets/icons/journal-50.png";
import rocket from "../../assets/icons/rocket.png";
import info from "../../assets/icons/info.png";
import "./HomePage.scss";

export default function HomePage({
  isLoggedIn,
  handleLogout,
  darkTheme,
  handleTheme,
  userData,
  errorMessage,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <main className={`home ${darkTheme ? "home--dark" : ""}`}>
            <div className="home__container">
              <HomePageGreeting darkTheme={darkTheme} userData={userData} />
              <section>
                <h2
                  className={`home__heading ${
                    darkTheme ? "home__heading--dark" : ""
                  }`}
                >
                  Tools
                </h2>
                <div className="home__articles">
                  <Link to="/mood-form" className="home__link">
                    <div
                      className={`home__article home__article--blue ${
                        darkTheme ? "home__article--blue--dark" : ""
                      }`}
                    >
                      <HomePageArticle darkTheme={darkTheme} icon={smile}>
                        Mood Check In
                      </HomePageArticle>
                    </div>
                  </Link>
                  <Link to="/mood-graph" className="home__link">
                    <div
                      className={`home__article home__article--orange ${
                        darkTheme ? "home__article--orange--dark" : ""
                      }`}
                    >
                      <HomePageArticle darkTheme={darkTheme} icon={graph}>
                        Mood Tracker
                      </HomePageArticle>
                    </div>
                  </Link>
                  <Link to="/journal" className="home__link">
                    <div
                      className={`home__article home__article--green ${
                        darkTheme ? "home__article--green--dark" : ""
                      }`}
                    >
                      <HomePageArticle darkTheme={darkTheme} icon={journal}>
                        Mood Journal
                      </HomePageArticle>
                    </div>
                  </Link>
                  <Link to="/mood-boosters" className="home__link">
                    <div
                      className={`home__article home__article--grey ${
                        darkTheme ? "home__article--grey--dark" : ""
                      }`}
                    >
                      <HomePageArticle darkTheme={darkTheme} icon={rocket}>
                        Mood Booster
                      </HomePageArticle>
                    </div>
                  </Link>
                  <Link to="/mood-information" className="home__link">
                    <div
                      className={`home__article home__article--navy ${
                        darkTheme ? "home__article--navy--dark" : ""
                      }`}
                    >
                      <HomePageArticle darkTheme={darkTheme} icon={info}>
                        Mood Hub
                      </HomePageArticle>
                    </div>
                  </Link>
                </div>
              </section>
              {errorMessage && <p className="home__error">{errorMessage}</p>}
            </div>
          </main>
        </>
      )}
    </>
  );
}
