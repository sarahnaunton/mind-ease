import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import goodgoodgood from "../assets/images/goodgoodgood.jpeg";
import goodNews from "../assets/images/good-news-network.jpg";
import happyNews from "../assets/images/happy-news.png";
import optimist from "../assets/images/optimist.png";
import positiveNews from "../assets/images/positive-news-logo-500.jpg";
import rtbc from "../assets/images/rtbc.jpg";
import BurnOutResource from "./BurnOutResource/BurnOutResource";

export default function HappyResources({ darkTheme }) {
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
        Here are some resources which can provide you happiness and joy
      </h2>
      <Slider {...settings}>
        <Link
          to="https://www.goodgoodgood.co/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <BurnOutResource image={goodgoodgood} darkTheme={darkTheme}>
            Good Good Good
          </BurnOutResource>
        </Link>
        <Link
          to="https://www.optimistdaily.com/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <BurnOutResource image={optimist} darkTheme={darkTheme}>
            Optimist Daily
          </BurnOutResource>
        </Link>

        <Link
          to="https://www.goodnewsnetwork.org/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <BurnOutResource image={goodNews} darkTheme={darkTheme}>
            Good News Network
          </BurnOutResource>
        </Link>

        <Link
          to="https://www.positive.news/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <BurnOutResource image={positiveNews} darkTheme={darkTheme}>
            Positive News
          </BurnOutResource>
        </Link>
        <Link
          to="https://reasonstobecheerful.world/"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <BurnOutResource image={rtbc} darkTheme={darkTheme}>
            Reasons to be Cheerful
          </BurnOutResource>
        </Link>
        <Link
          to="https://thehappynewspaper.com/?v=79cba1185463"
          className={`resources__link ${
            darkTheme ? "resources__link--dark" : ""
          }`}
        >
          <BurnOutResource image={happyNews} darkTheme={darkTheme}>
            The Happy News
          </BurnOutResource>
        </Link>
      </Slider>
    </section>
  );
}
