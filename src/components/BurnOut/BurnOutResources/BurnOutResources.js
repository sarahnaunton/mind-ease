import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Resource from "../../Resource/Resource";
import mind from "../../../assets/images/mind.png";
import calm from "../../../assets/images/calm.jpg";
import rethink from "../../../assets/images/re-think.svg";
import mhMatters from "../../../assets/images/mh-matters.svg";
import mhFoundation from "../../../assets/images/mh-foundation.png";
import nhs from "../../../assets/images/NHS.png";
import "./BurnOutResources.scss";

export default function BurnOutResources() {
  const { darkTheme } = useContext(ThemeContext);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 6,
    autoplay: true,
    speed: 15000,
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
        Here are some resources that can provide additional support and guidance{" "}
      </h2>
      <Slider {...settings}>
        <Link
          target="_blank"
          to="https://mentalhealth-uk.org/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <Resource image={mhMatters}>Mental Health UK</Resource>
        </Link>
        <Link
          target="_blank"
          to="https://www.nhs.uk/every-mind-matters/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <Resource image={nhs}>NHS Every Mind Matters</Resource>
        </Link>
        <Link
          target="_blank"
          to="https://www.mind.org.uk/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <Resource image={mind}>Mind</Resource>
        </Link>
        <Link
          target="_blank"
          to="https://www.rethink.org/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <Resource image={rethink}>Rething Mental Illness</Resource>
        </Link>
        <Link
          target="_blank"
          to="https://www.mentalhealth.org.uk/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <Resource image={mhFoundation}>Mental Health Foundation</Resource>
        </Link>
        <Link
          target="_blank"
          to="https://www.thecalmzone.net/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <Resource image={calm}>Campaign Against Living Miserably</Resource>
        </Link>
      </Slider>
    </section>
  );
}
