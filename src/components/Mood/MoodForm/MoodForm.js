import axios from "axios";
import { useState, useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { ChartContext } from "../../../contexts/ChartContext";
import questions from "../../../data/questions";
import Button from "../../Button/Button";
import "./MoodForm.scss";

export default function MoodForm() {
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);
  const { getChartData } = useContext(ChartContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [selectFieldValue, setSelectFieldValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleNext = () => {
    if (!selectFieldValue) {
      return;
    }
    setCurrentQuestionIndex((prevIndex) => {
      // If the next question was previously answered, put the answer in the select field
      setSelectFieldValue(responses[`question-${prevIndex + 2}`] || "");
      // Update the current question index regardless
      return prevIndex + 1;
    });
  };

  const handlePrevious = () => {
    // Update the select value to the previous answer
    setCurrentQuestionIndex((prevIndex) => {
      setSelectFieldValue(responses[`question-${prevIndex}`]);
      return prevIndex - 1;
    });
  };

  const handleChange = (event) => {
    setSelectFieldValue(event.target.value);
    setResponses({ ...responses, [event.target.name]: event.target.value });
  };

  const handleForm = async (event) => {
    const authToken = localStorage.getItem("authToken");
    event.preventDefault();
    setSuccessMessage(false);
    setErrorMessage(false);

    const score = Object.values(responses).reduce(
      (total, value) => total + parseInt(value),
      0
    );

    let category;
    if (score < 30) {
      category = "Low";
    }
    if (score >= 30 && score < 45) {
      category = "Medium";
    }
    if (score >= 45) {
      category = "High";
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/scores`,
        {
          score: score,
          category: category,
        },
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      setSuccessMessage(true);
      getChartData();
      navigate("/mood-graph");
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <section className={`mood-form ${darkTheme ? "mood-form--dark" : ""}`}>
      <form onSubmit={handleForm}>
        {currentQuestionIndex < questions.length && (
          <fieldset className="mood-form__fieldset">
            <label
              htmlFor={`question-${currentQuestionIndex + 1}`}
              className={`mood-form__label ${
                darkTheme ? "mood-form__label--dark" : ""
              }`}
            >
              {` ${questions[currentQuestionIndex].number}. ${questions[currentQuestionIndex].question} `}
            </label>
            <select
              name={`question-${currentQuestionIndex + 1}`}
              id={`question-${currentQuestionIndex + 1}`}
              value={selectFieldValue}
              onChange={handleChange}
              className={`mood-form__input ${
                darkTheme ? "mood-form__input--dark" : ""
              }`}
            >
              {questions[currentQuestionIndex].options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </fieldset>
        )}
        {currentQuestionIndex === questions.length && (
          <section>
            <p
              className={`mood-form__text ${
                darkTheme ? "mood-form__text--dark" : ""
              }`}
            >
              Thank you for taking the time to complete the questionnaire.
              Please press the Submit button to finalise your responses.
            </p>
            <div className="mood-form__button">
              <Button>Submit</Button>
            </div>
            <p
              className={`mood-form__text ${
                darkTheme ? "mood-form__text--dark" : ""
              }`}
            >
              Keep in mind, regularly completing the questionnaire is essential
              for understanding and improving your mental wellbeing.
            </p>
            {errorMessage && <p className="mood-form__error">{errorMessage}</p>}
            {successMessage && (
              <p className="mood-form__text mood-form__text--success">
                Successful!
              </p>
            )}
          </section>
        )}
      </form>
      <div className="mood-form__buttons">
        {currentQuestionIndex > 0 && (
          <div className="mood-form__button" onClick={handlePrevious}>
            <Button>Previous</Button>
          </div>
        )}
        {currentQuestionIndex < 16 && (
          <div className="mood-form__button" onClick={handleNext}>
            <Button>Next</Button>
          </div>
        )}
      </div>
    </section>
  );
}
