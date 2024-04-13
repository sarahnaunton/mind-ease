import { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

function UserProvider(props) {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  const getUserData = async () => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
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
        setErrorMessage(false);
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, getUserData, errorMessage }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
