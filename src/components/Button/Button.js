import "./Button.scss";

export default function Button({ children, darkTheme }) {
  return (
    <button className={`button ${darkTheme ? "button--dark" : ""}`}>
      {children}
    </button>
  );
}