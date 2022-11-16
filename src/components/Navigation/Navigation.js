import React from "react";
import { Link, NavLink } from 'react-router-dom';
import "./Navigation.css";

function Navigation({ onMainHeader }) {
    const [isOpen, setIsOpen] = React.useState(false);

    function handleOpenClick() {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className={`navigation ${isOpen && "navigation__background"}`}>
                <nav className="navigation__container">
                    <ul className={`navigation__list ${isOpen && "navigation__list-sidebar"}`}>
                        <li className={`navigation__link-container navigation__link-container-sidebar ${isOpen && "navigation__link-container-sidebar_active"}`}>
                            <NavLink exact to="/" className="navigation__link" activeClassName="navigation__link_active">
                                Главная
                            </NavLink>
                        </li>
                        <li className="navigation__link-container">
                            <NavLink to="/movies" className={`navigation__link ${(onMainHeader && !isOpen) && "navigation__link_type_main"}`} activeClassName="navigation__link_active">
                                Фильмы
                            </NavLink>
                        </li>
                        <li className="navigation__link-container">
                            <NavLink to="/saved-movies" className={`navigation__link ${(onMainHeader && !isOpen) && "navigation__link_type_main"}`} activeClassName="navigation__link_active">
                                Сохранённые фильмы
                            </NavLink>
                        </li>
                        <li className="navigation__link-container navigation__link-container_type_account">
                            <Link to="/profile" className="navigation__link navigation__link_type_account">Аккаунт</Link>
                        </li>
                    </ul>
                </nav>
                <button className={`navigation__sidebar-close-icon ${isOpen && "navigation__sidebar-close-icon_active"}`} type="button" onClick={handleOpenClick}></button>
            </div>
            <button className="navigation__sidebar-image" type="button" onClick={handleOpenClick}></button>
        </>
    );
}

export default Navigation;