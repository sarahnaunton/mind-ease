import axios from "axios";
import { useState, useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Markdown from "markdown-to-jsx";
import Loader from "../../Loader/Loader";
import "./RecommendAI.scss";

export default function RecommendAI({ boosterEntries, userData, chartData }) {
  const { darkTheme } = useContext(ThemeContext);
  const [recommendation, setRecomendation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const prompt = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `for a mental health wellbeing app, 
        can you suggest personalised recommendations for strategies and activities for the user to improve their mood based on the following information:  
        1) the users personal and work information included here ${userInfo}, 
        2) activities which they enjoy and makes them happy included here ${boosters}, 
        3) their oldenburg burnout inventory scores ${score}.
        Can the response not have a heading.
        Can the response specifically refer to the information provided including referring to their working life as given in the ${userInfo}, 
        their oldenburg burnout inventory score and its pattern over time ${score}, 
        activities they have already listed ${boosters}, but also suggest some new activities based on what they already like. 
        Can your answer introduction include their name ${userInfo.firstname},
        and a generic sentance about the potential challenges faced of working in their specific occupation ${userInfo.occupation} and role ${userInfo.jobRole},
        and then say 'here are some personalised recommendations for strategies and activities to help you improve your mood and wellbeing'. 
        Can the text in the response be in 2nd person. 
        Can the response have suggestions listed in the format of bullet points. 
        Can there be 6 bullet points. 
        Can the response end 'Remember, prioritising your mental wellbeing is essential for overall health and happiness. Keep taking small steps towards self-care and seeking support when needed. 
        You are on the right path towards a healthier mindset. You've got this ${userInfo.firstname}!' 
        If there is no user information such as their name and occupation, please just give a generic introduction without referrencing their name or occupation and role.
        If there is no user information, at the end say 'If you share details about your occupation and role, we can tailor these strategies even further to suit your specific needs!'
        Ensure english spelling with 's' rather than 'z'. 
        Format the response as markdown. 
      `,
      },
    ],
    temperature: 0.7,
    max_tokens: 500,
  };

  const handleRecommendation = async () => {
    setIsLoading(true);
    setErrorMessage(false);
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
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(true);
    }
  };

  return (
    <section className="recommend">
      <h2
        className={`recommend__heading ${
          darkTheme ? "recommend__heading--dark" : ""
        }`}
      >
        Your personalised recommendations
      </h2>
      <p
        className={`recommend__text ${
          darkTheme ? "recommend__text--dark" : ""
        }`}
      >
        Click the button below to discover personalised suggestions perfectly
        suited to uplift your spirits and enhance your wellbeing.
      </p>
      <p
        className={`recommend__encourage ${
          darkTheme ? "recommend__encourage--dark" : ""
        }`}
      >
        Let's explore activities tailored just for you.
      </p>
      <div className="recommend__generator" onClick={handleRecommendation}>
        <h3
          className={`recommend__subheading ${
            darkTheme ? "recommend__subheading--dark" : ""
          }`}
        >
          Try Me
        </h3>
      </div>
      <div
        className={`recommend__text ${
          darkTheme ? "recommend__text--dark" : ""
        }`}
      >
        {recommendation && <Markdown>{recommendation}</Markdown>}
      </div>
      {isLoading && <Loader />}
      {errorMessage && (
        <p className="recommend__error">
          Something went wrong, please try again
        </p>
      )}
    </section>
  );
}
