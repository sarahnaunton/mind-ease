import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./Loader.scss";

export default function Loader() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <section className={`loader ${darkTheme ? "loader--dark" : ""}`}>
      <div>
        <h1
          className={`loader__heading ${
            darkTheme ? "loader__heading--dark" : ""
          }`}
        >
          Loading
        </h1>
        <div className="loader__bar">
          <div className="loader__circle loader__circle--one"></div>
          <div className="loader__circle loader__circle--two"></div>
          <div className="loader__circle loader__circle--three"></div>
        </div>
      </div>
    </section>
  );
}
