import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import BoosterEntry from "./BoosterEntry/BoosterEntry";

export default function BoosterEntries({ getBoosterEntries, boosterEntries }) {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <section className="entries">
      {!boosterEntries && (
        <h2
          className={`entries__heading ${
            darkTheme ? "entries__heading--dark" : ""
          }`}
        >
          Unable to get mood boosters
        </h2>
      )}
      {boosterEntries && boosterEntries.length === 0 && (
        <h2
          className={`entries__heading ${
            darkTheme ? "entries__heading--dark" : ""
          }`}
        >
          You have no mood boosters, how about creating one now?
        </h2>
      )}
      {boosterEntries && boosterEntries.length > 0 && (
        <h2
          className={`entries__heading ${
            darkTheme ? "entries__heading--dark" : ""
          }`}
        >
          Your mood boosters
        </h2>
      )}
      <div className="entries__entry">
        {boosterEntries &&
          boosterEntries
            .sort((a, b) => {
              const dateA = new Date(a.created_at);
              const dateB = new Date(b.created_at);
              return dateB - dateA;
            })
            .map((entry) => {
              return (
                <BoosterEntry
                  key={entry.id}
                  id={entry.id}
                  activity={entry.activity}
                  getBoosterEntries={getBoosterEntries}
                />
              );
            })}
      </div>
    </section>
  );
}
