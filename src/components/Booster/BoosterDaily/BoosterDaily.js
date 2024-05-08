import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import star from "../../../assets/icons/star.png";
import "./BoosterDaily.scss";

export default function BoosterDaily({ boosterEntries }) {
  const { darkTheme } = useContext(ThemeContext);
  const [errorMessage, setErrorMessage] = useState(false);
  const [text, setText] = useState("Click to Reveal");
  const [isAnimation, setIsAnimation] = useState(false);

  const randomIndex = Math.floor(Math.random() * boosterEntries.length + 0);
  const randomActivity = boosterEntries[randomIndex].activity;

  const getText = async () => {
    const authToken = localStorage.getItem("authToken");
    let text = "";

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/recommendations`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!data.length) {
        text = "Click To Reveal";
      }

      if (data.length) {
        const updatedAt = new Date(data[0].updated_at).toLocaleDateString(
          "en-GB"
        );
        const currentDate = new Date().toLocaleDateString("en-GB");

        if (updatedAt !== currentDate) {
          text = "Click To Reveal";
        }

        if (updatedAt === currentDate) {
          text = data[0].recommendation;
        }
      }
      setErrorMessage(false);
      setText(text);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  const getRecommendation = async () => {
    const authToken = localStorage.getItem("authToken");
    let text = "";

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/recommendations`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!data.length) {
        text = randomActivity;
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/recommendations`,
          {
            recommendation: randomActivity,
          },
          {
            headers: {
              authorization: `Bearer ${authToken}`,
            },
          }
        );
      }

      if (data.length) {
        const updatedAt = new Date(data[0].updated_at).toLocaleDateString(
          "en-GB"
        );
        const currentDate = new Date().toLocaleDateString("en-GB");

        if (updatedAt === currentDate) {
          text = data[0].recommendation;
        }

        if (updatedAt !== currentDate) {
          text = randomActivity;

          await axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/recommendations/${data[0].id}`,
            {
              recommendation: randomActivity,
            },
            {
              headers: {
                authorization: `Bearer ${authToken}`,
              },
            }
          );
        }
      }
      setErrorMessage(false);
      setTimeout(() => {
        setText(text);
      }, 1500);
      setIsAnimation(true);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  useEffect(() => {
    getText();
  }, []);

  const handleClick = () => {
    getRecommendation();
  };

  return (
    <>
      <div className={`inspiration ${darkTheme ? "inspiration--dark" : ""} `}>
        <h2 className="inspiration__heading">Your daily inspiration</h2>
        <p
          className={`inspiration__text ${
            darkTheme ? "inspiration__text--dark" : ""
          } `}
        >
          Discovering daily inspiration can be challenging, so why not leave it
          to us?{" "}
        </p>
        <p
          className={`inspiration__text ${
            darkTheme ? "inspiration__text--dark" : ""
          } `}
        >
          Give us a minute to think before clicking to reveal your activity. In
          the meantime, take a moment to breathe.
        </p>
        <div className="inspiration__container" onClick={handleClick}>
          <h3
            className={`inspiration__activity ${
              isAnimation ? "inspiration__activity--animation" : ""
            } ${darkTheme ? "inspiration__activity--dark" : ""} `}
          >
            {text}
          </h3>
        </div>
        <p
          className={`inspiration__text ${
            darkTheme ? "inspiration__text--dark" : ""
          } `}
        >
          Try incorporating your selected activity into your daily schedule for
          a refreshing boost.{" "}
          <img
            src={star}
            alt="Star-Struck Emoji"
            className="inspiration__icon"
          />
        </p>
      </div>
      {errorMessage && <p className="inspiration__error">{errorMessage}</p>}
    </>
  );
}
