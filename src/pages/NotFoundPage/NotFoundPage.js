import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LogInMessage from "../../components/LogInMessage/LogInMessage";
import "./NotFoundPage.scss";

export default function NotFoundPage() {
    const {isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {!isLoggedIn && <LogInMessage />}
      {isLoggedIn && (
        <main className="found">
          <section className="found__container">
            <p className="found__text">
              Ooops! It seems like you've wandered off the beaten path.
            </p>
            <p className="found__text">
              Take a moment to breathe and remember, setbacks are just detours
              on the road to better mental health.
            </p>
            <p className="found__text">
              Feel free to navigate back to the{" "}
              <Link className="found__link" to="/home">
                {" "}
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
