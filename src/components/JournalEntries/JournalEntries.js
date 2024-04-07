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
        {!journalEntries && (<h2 className={`entries__heading ${darkTheme ? "entries__heading--dark" : ""}`}>You have no previous journal entries</h2>)}
        {journalEntries && (<h2 className={`entries__heading ${darkTheme ? "entries__heading--dark" : ""}`}>Your previous journal entries</h2>)}
        <div className="entries__entry">
          {journalEntries &&
            journalEntries
              .sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return dateB - dateA;
              })
              .map((entry) => {
                return (
                  <JournalEntry
                    key={entry.id}
                    id={entry.id}
                    entry={entry.entry}
                    timestamp={entry.created_at}
                    gratitude={entry.gratitude}
                    getJournalEntries={getJournalEntries}
                    darkTheme={darkTheme}
                  />
                );
              })}
        </div>
      </section>
    </>
  );
}
