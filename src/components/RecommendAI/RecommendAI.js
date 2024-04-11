import axios from "axios";
import { useState, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Markdown from "markdown-to-jsx";
import Button from "../Button/Button";
import "./RecommendAI.scss";

export default function RecommendAI({ boosterEntries, userData, chartData }) {
  const { darkTheme } = useContext(ThemeContext);
  const [recommendation, setRecomendation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  const boosters = boosterEntries.map((booster) => {
    return booster.activity;
  });

  const currentDate = new Date();
  const yearStarted = new Date(userData.year_started, 0);
  const yearsExperience = currentDate.getFullYear() - yearStarted.getFullYear();

  const userInfo = {
    firstname: userData.first_name,
    birthday: userData.date_of_birth,
    occupation: userData.occupation,
    jobRole: userData.role,
    workSetting: userData.work_setting,
    weeklyWorkingHours: userData.week_working_hours,
    yearsExperience,
  };

  const score = chartData.map((data) => {
    return [data.score, data.created_at];
  });

  const [prompt, setPrompt] = useState({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `for a mental health well-being app, 
        please can you suggest personalised recommendations for strategies and activities for the user to improve their mood based on the following information:  
        1) the users personal and work information included here ${userInfo}, 
        2) activities which they enjoy and makes them happy included here ${boosters}, 
        3) their oldenburg burnout inventory scores ${score}.
        Please can the response specifically refer to the information provided including referring to their working life as given in the ${userInfo}, 
        their oldenburg burnout inventory score and its pattern over time ${score}, 
        activities they have already listed ${boosters}, but also suggest some new activities based on what they already like. 
        Please can your answer introduction include their name ${userInfo.firstname},
        and a generic sentance about the potential challenges faced of working in their specific occupation ${userInfo.occupation} and role ${userInfo.jobRole},
        and then say 'here are some personalised recommendations for strategies and activities to help you improve your mood and well-being'. 
        Please can the text in the response be in 2nd person. 
        Please can the response have suggestions listed in the format of bullet points. 
        Please can there be 6 bullet points. 
        Please can the response end 'Remember, prioritising your mental well-being is essential for overall health and happiness. Keep taking small steps towards self-care and seeking support when needed. 
        You are on the right path towards a healthier mindset. You've got this ${userInfo.firstname}.' 
        Please ensure english spelling with 's' rather than 'z'. 
        Please format the response as markdown. 
      `,
      },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  const handleRecommendation = async () => {
    try {
      const { data } = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        prompt,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_OPEN_AI_KEY}`,
          },
        }
      );
      const generatedMessage = data.choices[0].message.content;
      setRecomendation(generatedMessage);
      setErrorMessage(false);
    } catch (error) {
      setErrorMessage(true);
    }
  };

  return (
    <section className="recommend">
      <h2 className="recommend__heading">Your personalised recommendations</h2>
      <p className="recommend__text">
        Let our advanced technology guide you towards discovering activities
        perfectly suited to uplift your spirits and enhance your well-being.
      </p>
      <div className="recommend__button" onClick={handleRecommendation}>
        <Button>Generate</Button>
      </div>
      <div className="recommend__text">
        {recommendation && <Markdown>{recommendation}</Markdown>}
      </div>
      {errorMessage && (
        <p className="journal-form__error">
          Something went wrong, please try again
        </p>
      )}
    </section>
  );
}
