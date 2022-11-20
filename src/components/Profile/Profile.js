import "./Profile.css";
import Header from "../Header/Header";
//import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ name, email }) {
    const loggedIn = true;
    return (
        <>
            <Header loggedIn={loggedIn} />
            <main>
                <section className="profile">
                    <h2 className="profile__title">{`Привет, ${name}!`}</h2>
                    <form className="profile__form" name="profile" noValidate>
                        <label className="profile__label">Имя
                            <input className="profile__input"
                                   type="text"
                                   name="name"
                                   minLength="2"
                                   maxLength="40"
                                   placeholder="имя"
                                   required
                                   defaultValue={name}
                            />
                            <span className="profile__input-error">
                            </span>
                        </label>
                        <label className="profile__label">E-mail
                            <input className="profile__input"
                                   type="email"
                                   name="email"
                                   minLength="2"
                                   maxLength="40"
                                   placeholder="e-mail"
                                   pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                                   required
                                   defaultValue={email}
                            />
                            <span className="profile__input-error">
                            </span>
                        </label>
                        <button className="profile__edit-button" type="submit" >Редактировать</button>
                    </form>
                    <button className="profile__sign-out-button" type="button">Выйти из аккаунта</button>
                </section>
            </main>
        </>
    );
}

export default Profile;