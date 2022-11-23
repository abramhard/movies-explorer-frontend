import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({ movie, savedMovies, onMovieLike, onMovieDelete }) {
    const { pathname } = useLocation();
    const { nameRU, duration, image, trailerLink, trailer } = movie;
    const durationCalc = `${Math.trunc(duration/60)}ч ${duration%60}м`;
    const isSaved = savedMovies.some((item) => item.movieId === movie.id);

    function handleLikeClick () {
        onMovieLike(movie);
    }

    function handleDeleteClick() {
        onMovieDelete(movie);
    }

    return (
        <li className="moviesCard">
            <h3 className="moviesCard__title">{nameRU}</h3>
            <p className="moviesCard__description">{durationCalc}</p>
                {pathname === "/movies" ?
                    <button className={`moviesCard__save-button 
                            ${isSaved ? "moviesCard__save-button_active" : ""}`}
                            type="button"
                            onClick={isSaved ? handleDeleteClick : handleLikeClick}
                    >
                    </button>
                    :
                    <button className="moviesCard__remove-button"
                            type="button"
                            onClick={handleDeleteClick}
                    ></button>
                }
            <a className="moviesCard__link" href={trailerLink ? trailerLink : trailer} target="_blank" rel="noreferrer">
                <img className="moviesCard__image" src={image.url ? `https://api.nomoreparties.co${image.url}` : image} alt={nameRU} />
            </a>
        </li>
    );
}

export default MoviesCard;