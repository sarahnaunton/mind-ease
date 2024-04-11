import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider(props) {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const themeJSON = localStorage.getItem("theme");
    if (themeJSON) {
      setDarkTheme(JSON.parse(themeJSON));
    }
  }, []);

  const handleTheme = () => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
    localStorage.setItem("theme", JSON.stringify(!darkTheme));
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, handleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
