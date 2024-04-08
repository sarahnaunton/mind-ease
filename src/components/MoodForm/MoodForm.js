import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import questions from "../../data/questions";
import Button from "../Button/Button";
import "./MoodForm.scss";

export default function MoodForm({ darkTheme }) {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [selectFieldValue, setSelectFieldValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleNext = () => {
    if (!selectFieldValue) {
      return;
    }
    setSelectFieldValue("");
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => {
      //Update the select value to the previous answer
      const previousAnswer = responses[`question-${prevIndex}`];
      setSelectFieldValue(previousAnswer);
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
    setFormSubmitted(false);

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
      setErrorMessage(false);
      setSuccessMessage(true);
      setFormSubmitted(true);
      navigate("/mood-graph");
    } catch (error) {
      setErrorMessage(true);
      console.error(error);
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
              <Button darkTheme={darkTheme}>Submit</Button>
            </div>
            {errorMessage && (
              <p className="mood-form__error">
                {" "}
                Something went wrong, please try again later.
              </p>
            )}
            {successMessage && (
              <p
                className={`mood-form__success ${
                  darkTheme ? "mood-form__sucess--dark" : ""
                }`}
              >
                {" "}
                Successful!
              </p>
            )}
          </section>
        )}
      </form>
      <div className="mood-form__buttons">
        {currentQuestionIndex > 0 && (
          <div className="mood-form__button" onClick={handlePrevious}>
            <Button darkTheme={darkTheme}>Previous</Button>
          </div>
        )}
        {currentQuestionIndex < 16 && (
          <div className="mood-form__button" onClick={handleNext}>
            <Button darkTheme={darkTheme}>Next</Button>
          </div>
        )}
      </div>
    </section>
  );
}