import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import "./HomePage.scss";

export default function HomePage({ isLoggedIn, setIsLoggedIn }) {
  const [userData, setUserData] = useState(null);

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
        <Navigation handleLogout={handleLogout}/>
          <h1>This is the home page of {userData.first_name}</h1>
        </section>
      )}
    </>
  );
}
