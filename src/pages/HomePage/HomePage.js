import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import Navigation from "../../components/Navigation/Navigation";
import HomePageGreeting from "../../components/Home/HomePageGreeting/HomePageGreeting";
import HomeIntroduction from "../../components/Home/HomeIntroduction/HomeIntroduction";
import HomePageArticle from "../../components/Home/HomePageArticle/HomePageArticle";
import smile from "../../assets/icons/smile.png";
import graph from "../../assets/icons/graph.png";
import journal from "../../assets/icons/journal.png";
import rocket from "../../assets/icons/rocket.png";
import info from "../../assets/icons/info.png";
import "./HomePage.scss";

export default function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);
  const { darkTheme } = useContext(ThemeContext);
  const { userData, errorMessage } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {!isLoggedIn && <LogInMessage />}
      {isLoggedIn && (
        <>
          <Navigation />
          <main className={`home ${darkTheme ? "home--dark" : ""}`}>
            <div className="home__container">
              <HomePageGreeting userData={userData} />
              <section>
                <HomeIntroduction />
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
                      <HomePageArticle icon={smile}>
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
                      <HomePageArticle icon={graph}>
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
                      <HomePageArticle icon={journal}>
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
                      <HomePageArticle icon={rocket}>
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
                      <HomePageArticle icon={info}>Mood Hub</HomePageArticle>
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
