import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

export default function HomePage({ setIsLoggedIn, isLoggedIn }) {
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
    <section>
      {!isLoggedIn && (
        <p>
          To view this page, you must log in. <span> <Link to="/log-in">Click here to log in</Link></span>
        </p>
      )}
      {userData && (
        <>
          <h1>This is the home page of {userData.first_name}</h1>
          <div onClick={handleLogout}>
          <Button>Log Out</Button>
          </div>
        </>
      )}
    </section>
  );
}
