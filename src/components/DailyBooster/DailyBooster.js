import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./DailyBooster.scss";

export default function DailyBooster({ boosterEntries }) {
  const { darkTheme } = useContext(ThemeContext);
  const [recommendation, setRecommendation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const randomIndex = Math.floor(Math.random() * boosterEntries.length + 0);

  const getRecommendation = async () => {
    const authToken = localStorage.getItem("authToken");
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
        setRecommendation(boosterEntries[randomIndex].activity);

        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/recommendations`,
          {
            recommendation: recommendation,
          },
          {
            headers: {
              authorization: `Bearer ${authToken}`,
            },
          }
        );
      }

      if (data) {
        const updatedAt = new Date(data[0].updated_at).toLocaleDateString(
          "en-GB"
        );
        const currentDate = new Date().toLocaleDateString("en-GB");

        if (updatedAt === currentDate) {
          setRecommendation(data[0].recommendation);
        }

        if (updatedAt !== currentDate) {
          setRecommendation(boosterEntries[randomIndex].activity);
          await axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/recommendations`,
            {
              recommendation: recommendation,
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
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  useEffect(() => {
    getRecommendation();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {recommendation && (
        <div className="inspiration">
          <h2
            className={`inspiration__heading ${
              darkTheme ? "inspiration__heading--dark" : ""
            } `}
          >
            Your daily inspiration
          </h2>
          <p className="inspiration__text"> Description</p>
          <div className="inspiration__container">
            <p className="inspiration__activity">{recommendation}</p>
          </div>
        </div>
      )}
      {errorMessage && <p className="booster__error">{errorMessage}</p>}
    </>
  );
}
