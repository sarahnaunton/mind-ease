import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LogInPage from "./pages/LogInPage";
import HomePage from "./pages/HomePage/HomePage";
import JournalPage from "./pages/JournalPage/JournalPage";
import MoodFormPage from "./pages/MoodFormPage/MoodFormPage";
import MoodGraphPage from "./pages/MoodGraphPage/MoodGraphPage";
import MoodBoosterPage from "./pages/MoodBoosterPage/MoodBoosterPage";
import MoodHubPage from "./pages/MoodHubPage/MoodHubPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "./App.scss";

function App() {
  const [userData, setUserData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [errorHomeMessage, setErrorHomeMessage] = useState(false);
  const [errorGraphMessage, setErrorGraphMessage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

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
      setErrorHomeMessage(false);
    } catch (error) {
      setErrorHomeMessage(error.response.data.error);
    }
  };

  const getChartData = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/scores`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      setChartData(data);
      setErrorGraphMessage(false);
    } catch (error) {
      setErrorGraphMessage(error.response.data.error);
    }
  };

  useEffect(() => {
    getUserData();
    getChartData();
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsLoggedIn(true);
    }
    const themeJSON = localStorage.getItem("theme");
    if (themeJSON) {
      setDarkTheme(JSON.parse(themeJSON));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  const handleTheme = () => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
    localStorage.setItem("theme", JSON.stringify(!darkTheme));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route
          path="log-in"
          element={<LogInPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="home"
          element={
            <HomePage
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              darkTheme={darkTheme}
              handleTheme={handleTheme}
              userData={userData}
              errorMessage={errorHomeMessage}
            />
          }
        />
        <Route
          path="journal"
          element={
            <JournalPage
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              darkTheme={darkTheme}
              handleTheme={handleTheme}
            />
          }
        />
        <Route
          path="mood-form"
          element={
            <MoodFormPage
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              darkTheme={darkTheme}
              handleTheme={handleTheme}
            />
          }
        />
        <Route
          path="mood-graph"
          element={
            <MoodGraphPage
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              darkTheme={darkTheme}
              handleTheme={handleTheme}
              chartData={chartData}
              errorMessage={errorGraphMessage}
            />
          }
        />
        <Route
          path="mood-boosters"
          element={
            <MoodBoosterPage
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              darkTheme={darkTheme}
              handleTheme={handleTheme}
              userData={userData}
              chartData={chartData}
            />
          }
        />
        <Route
          path="mood-information"
          element={
            <MoodHubPage
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              darkTheme={darkTheme}
              handleTheme={handleTheme}
            />
          }
        />
        <Route path="*" element={<NotFoundPage isLoggedIn={isLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
