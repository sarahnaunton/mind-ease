import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./Button.scss";

export default function Button({ children }) {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <button className={`button ${darkTheme ? "button--dark" : ""}`}>
      {children}
    </button>
  );
}
