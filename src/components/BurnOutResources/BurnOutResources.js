import { Link } from "react-router-dom";

export default function BurnOutResources({ children, icon, darkTheme }) {
  return (
    <section>
      <h2>
        Here are some resources which can provide further support and guidance{" "}
      </h2>
      <Link to="https://mentalhealth-uk.org/">
        <article>
          <p>Mental Health UK</p>
        </article>
      </Link>
      <Link to="https://www.nhs.uk/every-mind-matters/">
        <article>
          <p>NHS Every Mind Matters</p>
        </article>
      </Link>
      <Link to="https://www.mind.org.uk/">
        <article>
          <p>Mind</p>
        </article>
      </Link>
      <Link to="https://www.rethink.org/">
        <article>
          <p>Rethink Mental Illness</p>
        </article>
      </Link>
      <Link to="https://www.mentalhealth.org.uk/">
        <article>
          <p>Mental Health Foundation</p>
        </article>
      </Link>
      <Link to="https://www.thecalmzone.net/">
        <article>
          <p>CALM: Campaign Against Living Miserably</p>
        </article>
      </Link>
    </section>
  );
}
