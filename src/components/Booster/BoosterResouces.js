import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import goodgoodgood from "../../assets/images/goodgoodgood.jpeg";
import goodNews from "../../assets/images/good-news-network.jpg";
import happyNews from "../../assets/images/happy-news.png";
import optimist from "../../assets/images/optimist.png";
import positiveNews from "../../assets/images/positive-news.jpg";
import reasonsCheerful from "../../assets/images/reasons-cheerful.jpg";
import Resource from "../Resource/Resource";

export default function BoosterResources() {
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
  const { darkTheme } = useContext(ThemeContext);
  return (
    <section className={`resources ${darkTheme ? "resources--dark" : ""}`}>
      <h2
        className={`resources__subheading ${
          darkTheme ? "resources__subheading--dark" : ""
        }`}
      >
        Discover a variety of uplifting resources to bring happiness and joy
        into your day
      </h2>
      <Slider {...settings}>
        <Link
          target="_blank"
          to="https://www.goodgoodgood.co/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <Resource image={goodgoodgood}>Good Good Good</Resource>
        </Link>
        <Link
          target="_blank"
          to="https://www.optimistdaily.com/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <Resource image={optimist}>Optimist Daily</Resource>
        </Link>
        <Link
          target="_blank"
          to="https://www.goodnewsnetwork.org/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <Resource image={goodNews}>Good News Network</Resource>
        </Link>
        <Link
          target="_blank"
          to="https://www.positive.news/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <Resource image={positiveNews}>Positive News</Resource>
        </Link>
        <Link
          target="_blank"
          to="https://reasonstobecheerful.world/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <Resource image={reasonsCheerful}>Reasons to be Cheerful</Resource>
        </Link>
        <Link
          target="_blank"
          to="https://thehappynewspaper.com/?v=79cba1185463"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <Resource image={happyNews}>The Happy News</Resource>
        </Link>
      </Slider>
    </section>
  );
}
