import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import Navigation from "../../components/Navigation/Navigation";
import HomePageGreeting from "../../components/HomePageGreeting/HomePageGreeting";
import HomePageArticle from "../../components/HomePageArticle/HomePageArticle";
import smile from "../../assets/icons/smile-50.png";
import graph from "../../assets/icons/graph-50.png";
import journal from "../../assets/icons/journal-50.png";
import "./HomePage.scss";

export default function HomePage({ isLoggedIn, setIsLoggedIn }) {
  const [userData, setUserData] = useState(null);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }
  }, [isLoggedIn]);

  const getUserData = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUserData(null);
  };

  const handleTheme = () => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
    localStorage.setItem("theme", JSON.stringify(!darkTheme));
  };

  useEffect(() => {
    window.scrollTo(0,0)
    const themeJSON = localStorage.getItem("theme");
    if (themeJSON) {
      setDarkTheme(JSON.parse(themeJSON));
    }
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
                        Mood Check In
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
                </div>
              </section>
            </div>
          </main>
        </>
      )}
    </>
  );
}
