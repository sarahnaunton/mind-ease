import "./HomePageArticle.scss";

export default function HomePageArticle({ children, icon, darkTheme }) {
  return (
    <>
      <article className="article">
        <h2
          className={`article__heading ${
            darkTheme ? "article__heading--dark" : ""
          }`}
        >
          {children}
        </h2>
        <img className="article__icon" src={icon} alt="Icon" />
      </article>
    </>
  );
}
