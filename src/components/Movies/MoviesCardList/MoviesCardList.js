import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { movieData } from '../../../utils/image_film'
function MoviesCardList() {
    const createCardsMovies = movieData.map((item) => <MoviesCard movieData={item}  key={item._id} />);

    return(
        <section className='movies__section'>
            <div className='movies__container'>
                <ul className='movies__list'>
                    {createCardsMovies}
                </ul>
                    <div className='movies__container-with-button'>
                        <button className='movies__button' type='button'>Ещё</button>
                    </div>
            </div>
        </section>
    )
}

export default MoviesCardList;