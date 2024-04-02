import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="home" element={<HomePage />} />
        {/* <Route path="mood-form" element={<MoodFormPage />} /> 
        <Route path="mood-graph" element={<MoodGaphPage />} /> 
        <Route path="journal" element={<JournalPage />} /> 
        <Route path="*" element={<NotFoundPage />} />  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
