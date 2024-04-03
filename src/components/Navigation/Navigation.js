import { NavLink } from "react-router-dom";
import home from "../../assets/icons/home-50.png";
import logout from "../../assets/icons/log-out-50.png";
import "./Navigation.scss";


export default function Navigation({handleLogout}) {
    return (
      <nav className="nav">
        <div className="nav__container">
          <ul className="nav__list">
            <NavLink to="/home" className="nav__link">
              <li className="nav__item">
                <img src={home} alt="Home Icon" />
                <p className="nav__text">Home</p>
              </li>
            </NavLink>
            <NavLink className="nav__link">
              <li className="nav__item" onClick={handleLogout}>
                <img src={logout} alt="Log Out Icon" />
                <p className="nav__text">Log Out</p>
              </li>
            </NavLink>
          </ul>
        </div>
      </nav>
    );
  }
  