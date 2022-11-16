import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies({loggedIn, isLoading, checked }) {
    return (
        <>
            <Header loggedIn={!loggedIn} />
            <main>
                <SearchForm
                    checked={checked}
                />
                {isLoading ?
                    <Preloader />
                    :
                    <MoviesCardList
                        checked={checked}
                    />
                }
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;