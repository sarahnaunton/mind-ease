import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./Resource.scss";

export default function Resource({ children, image }) {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <article className="resource">
      <img
        src={image}
        alt="Resource Logo"
        className={`resource__image ${
          darkTheme ? "resource__image--dark" : ""
        }`}
      />
      <p
        className={`resource__text ${darkTheme ? "resource__text--dark" : ""}`}
      >
        {children}
      </p>
    </article>
  );
}
