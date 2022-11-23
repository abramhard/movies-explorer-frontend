import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";
import search_icon from "../../../images/search-form__button.svg";
import useFormValidation from "../../../hooks/useFormValidation";
import { ENTER_KEYWORD } from "../../../utils/errorMessage.js";

function SearchForm({ onSearchMovies, checked, onChangeСheckbox }) {
    const [errorText, setErrorText] = React.useState("");
    const { values, isValid, handleChange } = useFormValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            onSearchMovies(values.search);
        } else {
            setErrorText(ENTER_KEYWORD);
        }
    }
    return (
        <section className="search-section">
            <form className="search__form" name="search" onSubmit={handleSubmit} noValidate>
                <img className="search-form__icon" src={search_icon} alt="Лупа"/>
                <input className="search-form__input"
                       type="text"
                       name="search"
                       placeholder="Фильм"
                       value={values.search || ""}
                       onChange={handleChange}
                       required
                />
                <span className="search-form__validate-error">{isValid && values.search ? "" : `${errorText}`}</span>
                <button className="search-form__btn" type="submit">
                </button>
                <div className="search-form__border">
                </div>
            </form>
            <FilterCheckbox
                checked={checked}
                onChangeСheckbox={onChangeСheckbox}
            />
        </section>
    );
}

export default SearchForm;