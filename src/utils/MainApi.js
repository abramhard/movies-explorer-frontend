const BASE_URL = "https://api.abramhard.movie.nomoredomains.icu";
//const BASE_URL = 'http://localhost:3000'
function checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

export const signUp = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    })
        .then((res) => checkResponse(res));
};

export const signIn = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => checkResponse(res));
};

export const signOut = () => {
    return fetch(`${BASE_URL}/signout`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (res.ok) {
                return res;
            } else {
                return Promise.reject(`Ошибка ${res.status}`);
            }
        });
};

export const getUserProfile = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then((res) => checkResponse(res));
};

export const updateUserProfile = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email }),
    })
        .then((res) => checkResponse(res));
};

export const getSavedMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then((res) => checkResponse(res));
};

export const saveMovie = (movie) => {
    return fetch(`${BASE_URL}/movies`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie),
    })
        .then((res) => checkResponse(res));
};

export const deleteMovie = (movieId) => {
    return fetch(`${BASE_URL}/movies/${movieId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then((res) => checkResponse(res));
};