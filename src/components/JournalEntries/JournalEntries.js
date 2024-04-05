import JournalEntry from "../JournalEntry/JournalEntry";
import "./JournalEntries.scss";

export default function JournalEntries({
  getJournalEntries,
  journalEntries,
  darkTheme,
}) {
  
  return (
    <>
      <section className="entries">
        <h2 className="entries__heading">Your previous journal entries</h2>
        <div className="entries__entry">
          {journalEntries &&
            journalEntries.map((entry) => {
              return (
                <JournalEntry
                  key={entry.id}
                  id={entry.id}
                  date={entry.created_at}
                  entry={entry.entry}
                  gratitude={entry.gratitude}
                  getJournalEntries={getJournalEntries}
                  darkTheme={darkTheme}
                />
              );
            })}
        </div>
        <p className="entries__link">Click here to see more</p>
        <p className="entries__link">Click here to see less</p>
      </section>
    </>
  );
}
