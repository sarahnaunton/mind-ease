import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
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
    const themeJSON = localStorage.getItem("theme");
    if (themeJSON) {
      setDarkTheme(JSON.parse(themeJSON));
    }
  }, []);

  const time = new Date().getHours();
  let greeting;
  if (time < 12) {
    greeting = "Good Morning";
  } else if (time >= 12 && time < 18) {
    greeting = "Good Afternoon";
  } else if (time >= 18 && time < 24) {
    greeting = "Good Evening";
  } else {
    greeting = "Hello";
  }

  return (
    <>
      {!isLoggedIn && (
        <section className="login-message">
          <div className="login-message__container">
            <p className="login-message__text">
              To view this page, you must be logged in.{" "}
              <span>
                {" "}
                <Link to="/log-in" class="login-message__link">
                  Click here to log in
                </Link>
              </span>
            </p>
          </div>
        </section>
      )}
      {userData && (
        <>
          <Navigation
            handleLogout={handleLogout}
            darkTheme={darkTheme}
            handleTheme={handleTheme}
          />
          <main className={`home ${darkTheme ? "home--dark" : ""}`}>
            <div className="home__container">
              <div>
                <h1
                  className={`home__greeting ${
                    darkTheme ? "home__greeting--dark" : ""
                  }`}
                >
                  {greeting},{" "}
                  <span
                    className={`home__name ${
                      darkTheme ? "home__name--dark" : ""
                    }`}
                  >
                    {userData.first_name}
                  </span>
                </h1>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}
