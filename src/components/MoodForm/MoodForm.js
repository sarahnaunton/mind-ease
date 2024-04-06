import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../Button/Button";
import "./MoodForm.scss";

const questions = [
  {
    question: "I always find new and interesting aspects in my work.",
    number: 1,
    options: [
      { label: "Please choose from one of the below", value: 0 },
      { label: "Strongly Agree", value: 1 },
      { label: "Agree", value: 2 },
      { label: "Disagree", value: 3 },
      { label: "Strongly Disagree", value: 4 },
    ],
  },
  {
    question: "There are days when I feel tired before I arrive at work.",
    number: 2,
    options: [
      { label: "Please choose from one of the below", value: 0 },
      { label: "Strongly Agree", value: 4 },
      { label: "Agree", value: 3 },
      { label: "Disagree", value: 2 },
      { label: "Strongly Disagree", value: 1 },
    ],
  },
  {
    question:
      "It happens more and more often that I talk about my work in a negative way.",
    number: 3,
    options: [
      { label: "Please choose from one of the below", value: 0 },
      { label: "Strongly Agree", value: 4 },
      { label: "Agree", value: 3 },
      { label: "Disagree", value: 2 },
      { label: "Strongly Disagree", value: 1 },
    ],
  },
  {
    question:
      "After work, I tend to need more time than in the past in order to relax and feel better.",
    number: 4,
    options: [
      { label: "Please choose from one of the below", value: 0 },
      { label: "Strongly Agree", value: 4 },
      { label: "Agree", value: 3 },
      { label: "Disagree", value: 2 },
      { label: "Strongly Disagree", value: 1 },
    ],
  },
  {
    question: " I can tolerate the pressure of my work very well.",
    number: 5,
    options: [
      { label: "Please choose from one of the below", value: 0 },
      { label: "Strongly Agree", value: 1 },
      { label: "Agree", value: 2 },
      { label: "Disagree", value: 3 },
      { label: "Strongly Disagree", value: 4 },
    ],
  },
  {
    question:
      "Lately, I tend to think less at work and do my job almost mechanically.",
    number: 6,
    options: [
      { label: "Please choose from one of the below", value: 0 },
      { label: "Strongly Agree", value: 4 },
      { label: "Agree", value: 3 },
      { label: "Disagree", value: 2 },
      { label: "Strongly Disagree", value: 1 },
    ],
  },
  {
    question: "I find my work to be a positive challenge.",
    number: 7,
    options: [
      { label: "Please choose from one of the below", value: 0 },
      { label: "Strongly Agree", value: 1 },
      { label: "Agree", value: 2 },
      { label: "Disagree", value: 3 },
      { label: "Strongly Disagree", value: 4 },
    ],
  },
  {
    question: "During my work, I often feel emotionally drained. ",
    number: 8,
    options: [
      { label: "Please choose from one of the below", value: 0 },
      { label: "Strongly Agree", value: 4 },
      { label: "Agree", value: 3 },
      { label: "Disagree", value: 2 },
      { label: "Strongly Disagree", value: 1 },
    ],
  },
  {
    question: "Over time, one can become disconnected from this type of work.",
    number: 9,
    options: [
      { label: "Please choose from one of the below", value: 0 },
      { label: "Strongly Agree", value: 4 },
      { label: "Agree", value: 3 },
      { label: "Disagree", value: 2 },
      { label: "Strongly Disagree", value: 1 },
    ],
  },
  {
    question: "After working, I have enough energy for my leisure activities.",
    number: 10,
    options: [
      { label: "Please choose from one of the below", value: 0 },
      { label: "Strongly Agree", value: 1 },
      { label: "Agree", value: 2 },
      { label: "Disagree", value: 3 },
      { label: "Strongly Disagree", value: 4 },
    ],
  },
  {
    question: "Sometimes I feel sickened by my work tasks",
    number: 11,
    options: [
      { label: "Please choose from one of the below", value: 0 },
      { label: "Strongly Agree", value: 4 },
      { label: "Agree", value: 3 },
      { label: "Disagree", value: 2 },
      { label: "Strongly Disagree", value: 1 },
    ],
  },
  {
    question: "After my work, I usually feel worn out and weary.",
    number: 12,
    options: [
      { label: "Please choose from one of the below", value: 0 },
      { label: "Strongly Agree", value: 4 },
      { label: "Agree", value: 3 },
      { label: "Disagree", value: 2 },
      { label: "Strongly Disagree", value: 1 },
    ],
  },
  {
    question: "This is the only type of work that I can imagine myself doing.",
    number: 13,
    options: [
      { label: "Please choose from one of the below", value: 0 },
      { label: "Strongly Agree", value: 1 },
      { label: "Agree", value: 2 },
      { label: "Disagree", value: 3 },
      { label: "Strongly Disagree", value: 4 },
    ],
  },
  {
    question: " Usually, I can manage the amount of work well.",
    number: 14,
    options: [
      { label: "Please choose from one of the below", value: 0 },
      { label: "Strongly Agree", value: 1 },
      { label: "Agree", value: 2 },
      { label: "Disagree", value: 3 },
      { label: "Strongly Disagree", value: 4 },
    ],
  },
  {
    question: "I feel more and more engaged in my work.",
    number: 15,
    options: [
      { label: "Please choose from one of the below", value: 0 },
      { label: "Strongly Agree", value: 1 },
      { label: "Agree", value: 2 },
      { label: "Disagree", value: 3 },
      { label: "Strongly Disagree", value: 4 },
    ],
  },
  {
    question: "When I work, I usually feel energised.",
    number: 16,
    options: [
      { label: "Please choose from one of the below", value: 0 },
      { label: "Strongly Agree", value: 1 },
      { label: "Agree", value: 2 },
      { label: "Disagree", value: 3 },
      { label: "Strongly Disagree", value: 4 },
    ],
  },
];

export default function MoodForm({ darkTheme }) {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [formError, setFormError] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleChange = (event) => {
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
      category = "low";
    }
    if (score >= 30 && score < 45) {
      category = "medium";
    }
    if (score >= 45) {
      category = "high";
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
            {formError.form && (
              <p className="mood-form__error">{formError.form}</p>
            )}
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
