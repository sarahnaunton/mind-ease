import { useEffect, useState } from "react";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import Button from "../Button/Button";
import "./RecommendAI.scss";

export default function RecommendAI({
  darkTheme,
  boosterEntries,
  userData,
  chartData,
}) {
  const [recommendation, setRecomendation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  //gives an array of booster activities
  const boosters = boosterEntries.map((booster) => {
    return booster.activity;
  });

  //gives an array of user information
  const userInfo = {
    firstname: userData.first_name,
    lastname: userData.last_name,
  };

  //gives an array for score with the score and the category
  const score = chartData.map((data) => {
    return [data.score, data.created_at];
  });

  const [prompt, setPrompt] = useState({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `for a mental health well-being app, please can you suggest personalised recommendations for strategies and activities for the user to improve their mood based on the following information : the users information ${userInfo}, activities which they enjoy and makes them happy ${boosters}, their oldenburg burnout inventory score over time ${score}. Please can your answer introduction be 'here are some personalized recommendations for strategies and activities to help you improve your mood and well-being'. Please can the response use the activities they have already listed, but also suggest some new activities based on what they already like. Please can the text in the response be in 2nd person and mention their name ${userData.first_name} once. Please can the response have suggestions listed in the format of bullet points and also 5 bullet points. Please can the response end in a sentance reminding them of the importance of mental well-being and something encouraging. Please format the response as markdown. 

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
    console.log(data.choices[0].message.content)
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
        <Button darkTheme={darkTheme}>Generate</Button>
      </div>
      <div className="recommend__text">
        {recommendation && <Markdown>{recommendation}</Markdown>}
      </div>
      {errorMessage && <p className="journal-form__error">Something went wrong, please try again</p>}
    </section>
  );
}
