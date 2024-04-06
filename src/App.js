import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LogInPage from "./pages/LogInPage";
import HomePage from "./pages/HomePage/HomePage";
import JournalPage from "./pages/JournalPage/JournalPage";
import MoodFormPage from "./pages/MoodFormPage/MoodFormPage";
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
        {/* <Route path="mood-graph" element={<MoodGaphPage />} /> 
        <Route path="*" element={<NotFoundPage />} />  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
