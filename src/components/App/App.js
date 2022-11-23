import React from "react";
import "./App.css";
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import * as mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
    NOTHIHG_FOUND_SERVER,
    CONFLICT_ERROR_CODE,
    BAD_REQUEST_ERROR_CODE,
    UNAUTH_ERROR_CODE,
    UNAUTH_ERROR_MESSAGE,
    CONFLICT_ERROR_MESSAGE,
    BAD_REQUEST_ERROR_MESSAGE,
    SERVER_ERROR_MESSAGE,
    SUCCESS_UPDATE_MESSAGE,
} from "../../utils/errorMessage.js";
import { DURATION_SHORT_FILM } from "../../utils/constants.js";

function App() {

    const history = useHistory();
    const [loggedIn, setLoggedIn] = React.useState(JSON.parse(localStorage.getItem("loggedIn")) || false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);
    const [movies, setMovies] = React.useState(JSON.parse(localStorage.getItem("moviesAll")) || []);
    const [foundMovies, setFoundMovies] = React.useState(JSON.parse(localStorage.getItem("foundMovies")) || []);
    const [savedMovies, setSavedMovies] = React.useState(JSON.parse(localStorage.getItem("savedMovies")) || []);
    const [savedFoundMovies, setSavedFoundMovies] = React.useState(JSON.parse(localStorage.getItem("savedFoundMovies")) || []);
    const [nothingFoundServer, setNothingFoundServer] = React.useState("");
    const [checked, setChecked] = React.useState(false);
    const [checkedSaved, setCheckedSaved] = React.useState(false);
    const [isWasRequest, setIsWasRequest] = React.useState(false);
    const [isWasSavedRequest, setIsWasSavedRequest] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [isBadRequest, setIsBadRequest] = React.useState(false);
    const [isBadServerRequest, setIsBadServerRequest] = React.useState(false);
    const [isSuccessRequest, setIsSuccessRequest] = React.useState(false);

    React.useEffect(() => {
        if(loggedIn) {
            Promise.all([mainApi.getUserProfile(), mainApi.getSavedMovies()])
                .then(([user, movies]) => {
                    setCurrentUser(user);
                    setSavedMovies(movies);
                    localStorage.setItem("savedMovies", JSON.stringify(movies));
                    localStorage.setItem("loggedIn", JSON.stringify(true));
                })
                .catch((err) => {
                    console.log(err);
                    setLoggedIn(false);
                })
        }
    }, [loggedIn])

    function handleCleanLocalStorageAndStates() {
        localStorage.clear();
        setLoggedIn(false);
        setCurrentUser({});
        setMovies([]);
        setSavedMovies([]);
        setFoundMovies([]);
        setSavedFoundMovies([]);
        setIsWasRequest(false);
        setIsWasSavedRequest(false);
        history.push("/");
    }

    function handleRegister(name, email, password) {
        mainApi.signUp(name, email, password)
            .then((res) => {
                if (res) {
                    handleLogin(email, password);
                }
            })
            .catch((err) => {
                console.log(err);
                if (err === CONFLICT_ERROR_CODE) {
                    setIsBadRequest(true);
                    setMessage(CONFLICT_ERROR_MESSAGE);
                } else if (err === BAD_REQUEST_ERROR_CODE) {
                    setIsBadRequest(true);
                    setMessage(BAD_REQUEST_ERROR_MESSAGE);
                } else {
                    setIsBadRequest(true);
                    setMessage(SERVER_ERROR_MESSAGE);
                }
            })
            .finally(() => {
                setTimeout(() => setIsBadRequest(false), 5000);
            })
    }

    function handleLogin(email, password) {
        mainApi.signIn(email, password)
            .then(() => {
                setLoggedIn(true);
                history.push("/movies");
            })
            .catch((err) => {
                console.log(err);
                if (err === UNAUTH_ERROR_CODE) {
                    setIsBadRequest(true);
                    setMessage(UNAUTH_ERROR_MESSAGE);
                } else if (err === BAD_REQUEST_ERROR_CODE) {
                    setIsBadRequest(true);
                    setMessage(BAD_REQUEST_ERROR_MESSAGE);
                } else {
                    setIsBadRequest(true);
                    setMessage(SERVER_ERROR_MESSAGE);
                }
            })
            .finally(() => {
                setTimeout(() => setIsBadRequest(false), 5000);
            })
    }

    function handleSignOut() {
        mainApi.signOut()
            .then(() => {
                handleCleanLocalStorageAndStates();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateUser(name, email) {
        mainApi.updateUserProfile(name, email)
            .then((user) => {
                setCurrentUser(user);
                setIsSuccessRequest(true);
                setMessage(SUCCESS_UPDATE_MESSAGE);
            })
            .catch((err) => {
                console.log(err);
                if (err === CONFLICT_ERROR_CODE) {
                    setIsBadRequest(true);
                    setMessage(CONFLICT_ERROR_MESSAGE);
                } else if (err === BAD_REQUEST_ERROR_CODE) {
                    setIsBadRequest(true);
                    setMessage(BAD_REQUEST_ERROR_MESSAGE);
                } else {
                    setIsBadRequest(true);
                    setMessage(SERVER_ERROR_MESSAGE);
                }
            })
            .finally(() => {
                setTimeout(() => setIsSuccessRequest(false), 5000);
                setTimeout(() => setIsBadRequest(false), 5000);
            })
    }

    function handleFilterMovies(moviesData, keyword) {
        const foundResult = moviesData.filter((item) => {
            return (
                item.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
                item.description.toLowerCase().includes(keyword.toLowerCase())
            );
        });
        if (checked || checkedSaved) {
            return foundResult.filter((movie) => movie.duration <= DURATION_SHORT_FILM);
        } else {
            return foundResult;
        }
    }

    function handleChangeCheckbox() {
        setChecked(!checked);
    }

    function handleChangeSavedCheckbox() {
        setCheckedSaved(!checkedSaved);
    }

    function handleSearchMovies(searchText) {
        setIsLoading(true);
        if (movies.length === 0) {
            moviesApi.getAllMovies()
                .then((movies) => {
                    setMovies(movies);
                    localStorage.setItem("moviesAll", JSON.stringify(movies));
                    const foundMovies = handleFilterMovies(movies, searchText);
                    setFoundMovies(foundMovies);
                    localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
                })
                .catch((err) => {
                    console.log(err);
                    setIsBadServerRequest(true);
                    setNothingFoundServer(NOTHIHG_FOUND_SERVER);
                })
                .finally(() => {
                    setTimeout(() => setIsLoading(false), 1500);
                })
        } else {
            const movies = JSON.parse(localStorage.getItem("moviesAll"));
            const foundMovies = handleFilterMovies(movies, searchText);
            setFoundMovies(foundMovies);
            localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
            setTimeout(() => setIsLoading(false), 1500);
        }
        setIsWasRequest(true);
    }

    function handleMovieLike(movie) {
        mainApi.saveMovie({
            country: movie.country ? movie.country : "Нет данных",
            director: movie.director ? movie.director : "Нет данных",
            duration: movie.duration ? movie.duration : "Нет данных",
            year: movie.year ? movie.year : "Нет данных",
            description: movie.description ? movie.description : "Нет данных",
            image: `https://api.nomoreparties.co${movie.image.url}`,
            trailerLink: movie.trailerLink,
            thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
            movieId: movie.id,
            nameRU: movie.nameRU ? movie.nameRU : "Нет данных",
            nameEN: movie.nameEN ? movie.nameEN : movie.nameRU,
        })
            .then((newMovie) => {
                const newSavedMovies = [newMovie, ...savedMovies];
                setSavedMovies(newSavedMovies);
                localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleSearchSavedMovies(searchText) {
        setIsLoading(true);
        const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
        const savedFoundMovies = handleFilterMovies(savedMovies, searchText);
        setSavedFoundMovies(savedFoundMovies);
        localStorage.setItem("savedFoundMovies", JSON.stringify(savedFoundMovies));
        setIsWasSavedRequest(true);
        setTimeout(() => setIsLoading(false), 1500);
    }

    function handleMovieDelete(movie) {
        const deleteMovie = movie._id ? movie : savedMovies.find((savedMovie) => savedMovie.movieId === movie.id)
        mainApi.deleteMovie(deleteMovie._id)
            .then(() => {
                const newSavedMovies = savedMovies.filter((movie) => movie._id !== deleteMovie._id);
                setSavedMovies(newSavedMovies);
                localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
                const newSavedFoundMovies = savedFoundMovies.filter((movie) => movie._id !== deleteMovie._id);
                setSavedFoundMovies(newSavedFoundMovies);
                localStorage.setItem("savedFoundMovies", JSON.stringify(newSavedFoundMovies));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Switch>
                    <Route exact path="/">
                        <Main loggedIn={loggedIn} />
                    </Route>
                    <ProtectedRoute
                        path="/movies"
                        component={Movies}
                        loggedIn={loggedIn}
                        isLoading={isLoading}
                        movies={foundMovies}
                        savedMovies={savedMovies}
                        onSearchMovies={handleSearchMovies}
                        nothingFoundServer={nothingFoundServer}
                        isBadServerRequest={isBadServerRequest}
                        isWasRequest={isWasRequest}
                        onMovieLike={handleMovieLike}
                        onMovieDelete={handleMovieDelete}
                        checked={checked}
                        onChangeCheckbox={handleChangeCheckbox}
                    />
                    <ProtectedRoute
                        path="/saved-movies"
                        component={SavedMovies}
                        loggedIn={loggedIn}
                        isLoading={isLoading}
                        movies={savedFoundMovies}
                        savedMovies={savedMovies}
                        onSearchMovies={handleSearchSavedMovies}
                        isWasRequest={isWasSavedRequest}
                        onMovieDelete={handleMovieDelete}
                        checked={checkedSaved}
                        onChangeCheckbox={handleChangeSavedCheckbox}
                    />
                    <ProtectedRoute
                        path="/profile"
                        component={Profile}
                        loggedIn={loggedIn}
                        onUpdateUser={handleUpdateUser}
                        isSuccessRequest={isSuccessRequest}
                        message={message}
                        isBadRequest={isBadRequest}
                        onSignOut={handleSignOut}
                        onMovieDelete={handleMovieDelete}
                    />
                    <Route path="/signup">
                        {loggedIn && <Redirect to="/" />}
                        <Register
                            onRegister={handleRegister}
                            message={message}
                            isBadRequest={isBadRequest}
                        />
                    </Route>
                    <Route path="/signin">
                        {loggedIn && <Redirect to="/" />}
                        <Login
                            onLogin={handleLogin}
                            message={message}
                            isBadRequest={isBadRequest}
                        />
                    </Route>
                    <Route path="*">
                        <PageNotFound history={history} />
                    </Route>
                </Switch>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;