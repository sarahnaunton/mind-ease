import "./DailyBooster.scss";


export default function DailyBooster({ boosterEntries, darkTheme }) {
  const randomIndex = Math.floor(Math.random() * boosterEntries.length + 0);

  return (
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
        <p className="inspiration__activity">
          {boosterEntries[randomIndex].activity}
        </p>
      </div>
    </div>
  );
}
