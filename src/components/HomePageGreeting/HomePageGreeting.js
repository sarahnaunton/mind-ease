import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./HomePageGreeting.scss";

export default function HomePageGreeting({ userData }) {
  const { darkTheme } = useContext(ThemeContext);

  const time = new Date().getHours();
  let greeting;
  if (time < 12) {
    greeting = "Good Morning";
  } else if (time >= 12 && time < 18) {
    greeting = "Good Afternoon";
  } else if (time >= 18 && time < 24) {
    greeting = "Good Evening";
  } else {
    greeting = "Hello";
  }

  return (
    <>
      {!userData && (
        <section>
          <h1
            className={`greeting__text ${
              darkTheme ? "greeting__text--dark" : ""
            }`}
          >
            {greeting}
          </h1>
        </section>
      )}
      {userData && (
        <section className="greeting">
          <h1
            className={`greeting__text ${
              darkTheme ? "greeting__text--dark" : ""
            }`}
          >
            {greeting},{" "}
            <span
              className={`greeting__name ${
                darkTheme ? "greeting__name--dark" : ""
              }`}
            >
              {userData.first_name}
            </span>
          </h1>
        </section>
      )}
    </>
  );
}
