import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";
import search_icon from "../../../images/search-form__button.svg";

function SearchForm() {

    return (
        <form className="search-form">
            <img className="search-form__icon" src={search_icon} alt="Лупа"/>
            <input
                className="search-form__input"
                type="text"
                id="search-form-text-input"
                placeholder="Фильм"
                required
                name="searchFormInput"
                maxLength="30"
            />
            <FilterCheckbox />
            <button className="search-form__btn" type="submit"></button>
            <div className="search-form__border"></div>
        </form>
    )
}
export default SearchForm;
