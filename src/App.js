import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";
import { ChartProvider } from "./contexts/ChartContext";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LogInPage from "./pages/LogInPage";
import HomePage from "./pages/HomePage/HomePage";
import JournalPage from "./pages/JournalPage/JournalPage";
import MoodFormPage from "./pages/MoodFormPage";
import MoodGraphPage from "./pages/MoodGraphPage";
import MoodBoosterPage from "./pages/MoodBoosterPage";
import MoodHubPage from "./pages/MoodHubPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <UserProvider>
          <ChartProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="sign-up" element={<SignUpPage />} />
                <Route path="log-in" element={<LogInPage />} />
                <Route path="home" element={<HomePage />} />
                <Route path="journal" element={<JournalPage />} />
                <Route path="mood-form" element={<MoodFormPage />} />
                <Route path="mood-graph" element={<MoodGraphPage />} />
                <Route path="mood-boosters" element={<MoodBoosterPage />} />
                <Route path="mood-information" element={<MoodHubPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </ChartProvider>
        </UserProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
