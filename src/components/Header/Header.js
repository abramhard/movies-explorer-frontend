import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn, onMainHeader }) {
    return(
            <header className={`header ${onMainHeader && "header_main"}`}>
                <Link to="/">
                    <img className="header__logo" src={logo} alt="Логотип"/>
                </Link>
                {loggedIn ? (
                    <Navigation onMainHeader={onMainHeader} />
                ) : (
                    <nav>
                        <ul className="header__list">
                            <li>
                                <Link to="/signup" className="header__link header__link_register">Регистрация</Link>
                            </li>
                            <li>
                                <Link to="/signin" className="header__link header__link_login">Войти</Link>
                            </li>
                        </ul>
                    </nav>
                )}
        </header>
    );
}

export default Header;
