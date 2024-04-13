import { useState, useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import JournalEntry from "../JournalEntry/JournalEntry";
import "./JournalEntries.scss";

export default function JournalEntries({ getJournalEntries, journalEntries }) {
  const [searchJournal, setSearchJournal] = useState("");
  const { darkTheme } = useContext(ThemeContext);

  const handleSearch = (event) => {
    setSearchJournal(event.target.value);
  };

  const filteredJournals =
    journalEntries &&
    journalEntries.filter((entry) => {
      const searchedText = searchJournal.toLowerCase();
      const text = entry.entry.toLowerCase();
      const gratitude = entry.gratitude.toLowerCase();
      const timestamp = new Date(entry.created_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      return (
        text.includes(searchedText) ||
        gratitude.includes(searchedText) ||
        timestamp.includes(searchedText)
      );
    });

  return (
    <section className="entries">
      {!journalEntries && (
        <h2
          className={`entries__heading ${
            darkTheme ? "entries__heading--dark" : ""
          }`}
        >
          Unable to get previous journal entries
        </h2>
      )}
      {journalEntries && journalEntries.length === 0 && (
        <h2
          className={`entries__heading ${
            darkTheme ? "entries__heading--dark" : ""
          }`}
        >
          You have no previous journal entries, how about starting one now?
        </h2>
      )}
      {journalEntries && journalEntries.length > 0 && (
        <div className="entries__introduction">
          <h2
            className={`entries__heading ${
              darkTheme ? "entries__heading--dark" : ""
            }`}
          >
            Your previous journal entries
          </h2>
          <input
            className={`entries__search ${
              darkTheme ? "entries__search--dark" : ""
            }`}
            name="search"
            placeholder="Search"
            onChange={handleSearch}
          ></input>
        </div>
      )}
      <div className="entries__entry">
        {journalEntries &&
          filteredJournals
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
                />
              );
            })}
      </div>
    </section>
  );
}
