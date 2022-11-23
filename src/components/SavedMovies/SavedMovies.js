import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({
                         loggedIn,
                         isLoading,
                         movies,
                         savedMovies,
                         onSearchMovies,
                         isWasRequest,
                         onMovieDelete,
                         checked,
                         onChangeCheckbox
                     }) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            <main>
                <SearchForm
                    onSearchMovies={onSearchMovies}
                    checked={checked}
                    onChangeСheckbox={onChangeCheckbox}
                />
                {isLoading ?
                    <Preloader />
                    :
                    <MoviesCardList
                        movies={movies}
                        savedMovies={savedMovies}
                        checked={checked}
                        isWasRequest={isWasRequest}
                        onMovieDelete={onMovieDelete}
                    />
                }
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;