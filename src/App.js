import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LogInPage from "./pages/LogInPage";
import HomePage from "./pages/HomePage/HomePage";
import JournalPage from "./pages/JournalPage/JournalPage";
import MoodFormPage from "./pages/MoodFormPage/MoodFormPage";
import MoodGraphPage from "./pages/MoodGraphPage/MoodGraphPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MoodHubPage from "./pages/MoodHubPage/MoodHubPage";
import "./App.scss";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="log-in" element={<LogInPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="home" element={<HomePage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
        <Route path="journal" element={<JournalPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} /> 
        <Route path="mood-form" element={<MoodFormPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} /> 
        <Route path="mood-graph" element={<MoodGraphPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} /> 
        <Route path="mood-information" element={<MoodHubPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>}/>
        <Route path="*" element={<NotFoundPage  isLoggedIn={isLoggedIn}/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
