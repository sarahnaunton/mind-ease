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


  return (
    <>
      {!isLoggedIn && (
        <p>
          To view this page, you must log in.{" "}
          <span>
            {" "}
            <Link to="/log-in">Click here to log in</Link>
          </span>
        </p>
      )}
      {userData && (
        <section className="home">
        <Navigation handleLogout={handleLogout} darkTheme={darkTheme} handleTheme={handleTheme}/>
          <h1>This is the home page of {userData.first_name}</h1>
        </section>
      )}
    </>
  );
}
