import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import find from "../../assets/icons/find.png";
import "./NotFoundPage.scss";

export default function NotFoundPage() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {!isLoggedIn && <LogInMessage />}
      {isLoggedIn && (
        <main className="found">
          <section className="found__container">
            <p className="found__text">
              Ooops! We couldn't find that page.{" "}
              <img src={find} alt="Thinking Emoji" className="found__icon" />
            </p>
            <p className="found__text">
              Take a moment to breathe and remember, setbacks are just detours
              on the road to better mental health.
            </p>
            <p className="found__text">
              Head back to the{" "}
              <Link className="found__link" to="/home">
                home page
              </Link>{" "}
              and continue your journey towards wellness. You've got this!
            </p>
          </section>
        </main>
      )}
    </>
  );
}
