import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mind from "../../assets/images/mind.png";
import calm from "../../assets/images/calm.jpg";
import rethink from "../../assets/images/re-think.svg";
import mhMatters from "../../assets/images/mh-matters.svg";
import mhFoundation from "../../assets/images/mental-health-foundation-logo.png";
import nhs from "../../assets/images/NHS.png";
import "./BurnOutResources.scss";

export default function BurnOutResources({ darkTheme }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 1000,
    cssEase: "linear",
  };
  return (
    <section className={`resources ${darkTheme ? "resources--dark" : ""}`}>
      <h2
        className={`resources__subheading ${
          darkTheme ? "resources__subheading--dark" : ""
        }`}
      >
        Here are some resources which can provide further support and guidance{" "}
      </h2>
      <Slider {...settings}>
        <article>
          <Link
            to="https://mentalhealth-uk.org/"
            className={`resources__link ${
              darkTheme ? "resources__link--dark" : ""
            }`}
          >
            <img
              src={mhMatters}
              alt="Mental Health Matters Logo"
              className="resources__image"
            />
            <p
              className={`resources__text ${
                darkTheme ? "resources__text--dark" : ""
              }`}
            >
              Mental Health UK
            </p>
          </Link>
        </article>
        <article>
          <Link
            to="https://www.nhs.uk/every-mind-matters/"
            className={`resources__link ${
              darkTheme ? "resources__link--dark" : ""
            }`}
          >
            <img src={nhs} alt="NHS Logo" className="resources__image" />
            <p
              className={`resources__text ${
                darkTheme ? "resources__text--dark" : ""
              }`}
            >
              NHS Every Mind Matters
            </p>
          </Link>
        </article>
        <article>
          <Link
            to="https://www.mind.org.uk/"
            className={`resources__link ${
              darkTheme ? "resources__link--dark" : ""
            }`}
          >
            <img src={mind} alt="Mind Logo" className="resources__image" />
            <p
              className={`resources__text ${
                darkTheme ? "resources__text--dark" : ""
              }`}
            >
              Mind
            </p>
          </Link>
        </article>
        <article>
          <Link
            to="https://www.rethink.org/"
            className={`resources__link ${
              darkTheme ? "resources__link--dark" : ""
            }`}
          >
            <img
              src={rethink}
              alt="Re Think Logo"
              className="resources__image"
            />
            <p
              className={`resources__text ${
                darkTheme ? "resources__text--dark" : ""
              }`}
            >
              Rethink Mental Illness
            </p>
          </Link>
        </article>
        <article>
          <Link
            to="https://www.mentalhealth.org.uk/"
            className={`resources__link ${
              darkTheme ? "resources__link--dark" : ""
            }`}
          >
            <img
              src={mhFoundation}
              alt="Mental Health Foundation Logo"
              className="resources__image"
            />
            <p
              className={`resources__text ${
                darkTheme ? "resources__text--dark" : ""
              }`}
            >
              Mental Health Foundation
            </p>
          </Link>
        </article>
        <article>
          <Link
            to="https://www.thecalmzone.net/"
            className={`resources__link ${
              darkTheme ? "resources__link--dark" : ""
            }`}
          >
            <img src={calm} alt="Calm Logo" className="resources__image" />
            <p
              className={`resources__text ${
                darkTheme ? "resources__text--dark" : ""
              }`}
            >
              Campaign Against Living Miserably
            </p>
          </Link>
        </article>
      </Slider>
    </section>
  );
}
