import { Link } from 'react-router-dom';
import "./Register.css";
import logo from "../../images/logo/logo.svg";

function Register() {

    return (
        <main>
            <section className="register">
                <Link to="/" className="logo-container">
                    <img className="logo" src={logo} alt="Логотип"/>
                </Link>
                <h2 className="register__title">Добро пожаловать!</h2>
                <form className="register__form" name="register">
                    <label className="register__label">Имя
                        <input className="register__input"
                               type="text"
                               name="name"
                               minLength="2"
                               maxLength="40"
                               placeholder="имя"
                               required
                        />
                        <span className="register__input-error">
                        </span>
                    </label>
                    <label className="register__label">E-mail
                        <input className="register__input"
                               type="email"
                               name="email"
                               minLength="2"
                               maxLength="40"
                               placeholder="e-mail"
                               pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                               required
                        />
                        <span className="register__input-error">
                        </span>
                    </label>
                    <label className="register__label">Пароль
                        <input className="register__input"
                               type="password"
                               name="password"
                               placeholder="пароль"
                               minLength="8"
                               maxLength="200"
                               required
                        />
                        <span className="register__input-error">
                        </span>
                    </label>
                    <button className="register__button" type="submit" >Зарегистрироваться</button>
                </form>
                <div className="register__link-container">
                    <p className="register__link-text">Уже зарегистрированы?</p>
                    <Link to="/signin" className="register__link">Войти</Link>
                </div>
            </section>
        </main>
    );
}

export default Register;