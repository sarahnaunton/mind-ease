import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BurnOutResource from "../BurnOutResource/BurnOutResource";
import mind from "../../assets/images/mind.png";
import calm from "../../assets/images/calm.jpg";
import rethink from "../../assets/images/re-think.svg";
import mhMatters from "../../assets/images/mh-matters.svg";
import mhFoundation from "../../assets/images/mental-health-foundation-logo.png";
import nhs from "../../assets/images/NHS.png";
import "./BurnOutResources.scss";

export default function BurnOutResources() {
  const { darkTheme } = useContext(ThemeContext);

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
        <Link
          to="https://mentalhealth-uk.org/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <BurnOutResource image={mhMatters}>
            Mental Health UK
          </BurnOutResource>
        </Link>
        <Link
          to="https://www.nhs.uk/every-mind-matters/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <BurnOutResource image={nhs}>
            NHS Every Mind Matters
          </BurnOutResource>
        </Link>

        <Link
          to="https://www.mind.org.uk/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <BurnOutResource image={mind}>
            Mind
          </BurnOutResource>
        </Link>

        <Link
          to="https://www.rethink.org/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <BurnOutResource image={rethink}>
            Rething Mental Illness
          </BurnOutResource>
        </Link>
        <Link
          to="https://www.mentalhealth.org.uk/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <BurnOutResource image={mhFoundation}>
            Mental Health Foundation
          </BurnOutResource>
        </Link>
        <Link
          to="https://www.thecalmzone.net/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <BurnOutResource image={calm}>
            Campaign Against Living Miserably
          </BurnOutResource>
        </Link>
      </Slider>
    </section>
  );
}
