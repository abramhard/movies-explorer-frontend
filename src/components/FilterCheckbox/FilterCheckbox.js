import "./FilterCheckbox.css";
function FilterCheckbox() {
return (
    <div className="filter-checkbox">
        <label
            className="filter-checkbox__label"
        >
            <input
                className="filter-checkbox__input"
                type="checkbox"
                role="switch"
                id='filter-checkbox-shortfilm'
                name='filterShortfilm'
            />
            <span className="filter-checkbox__slider"/>
            Короткометражки
        </label>
    </div>
)
}

export default FilterCheckbox;