import { useLocation } from 'react-router-dom';
import './MoviesCard.css'
function MoviesCard({ movieData }) {
    const location = useLocation();
    function getTime (duration) {
        const hours = Math.floor(duration / 60);
        const minutes = Math.floor(duration % 60);
        return `${hours}ч ${minutes}м`;
    }

    return (
        <li className="moviesCard" id={movieData._id}>
            <h3 className="moviesCard__title">{movieData.name}</h3>
            <p className="moviesCard__description">{getTime(movieData.duration || 0)}</p>
            <button className={
                (location.pathname === '/saved-movies') ? ('moviesCard__remove-button') :
                    (location.pathname === '/movies' && movieData.saved) ? ('moviesCard__save-button_active') :
                        ('moviesCard__save-button')}
                    type="button"/>
            <a className="moviesCard__link">
                <img className="moviesCard__image" src={movieData.image} alt={movieData.name} />
            </a>
        </li>
    )
}
export default MoviesCard;