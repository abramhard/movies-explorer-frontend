import "./FilterCheckbox.css";

function FilterCheckbox({ checked, onChangeСheckbox }) {
    return (
        <div className="filter-checkbox">
            <label
                className="filter-checkbox__label"
            >
                <input
                    className="filter-checkbox__input"
                    type="checkbox"
                    name="short-movies"
                    checked={checked}
                    onChange={onChangeСheckbox}
                />
                <span className="filter-checkbox__slider"/>
                Короткометражки
            </label>
        </div>
    );
}

export default FilterCheckbox;