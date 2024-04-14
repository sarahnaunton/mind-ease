import { Link } from "react-router-dom";
import "./LogInMessage.scss";

export default function LogInMessage() {
  return (
    <section className="login-message">
      <div className="login-message__container">
        <p className="login-message__text">
          To view this page, you must be logged in.{" "}
          <span>
            <Link to="/log-in" className="login-message__link">
              Click here to log in
            </Link>
          </span>
        </p>
      </div>
    </section>
  );
}
