import { Record, OrderedSet } from 'immutable'
import { matchStrings } from '../utils'
import { LATEST_MOVIES } from '../const'
import { SLIDER_MOVIES } from '../const'


export const moduleName = 'movies'
export const SUCCESS = "_SUCCESS";
export const FAIL = "_FAIL";
export const FETCH_GENRES = `${moduleName}/FETCH_GENRES`;
export const FETCH_MOVIES = `${moduleName}/FETCH_MOVIES`;
export const ADD_FAVOURITE_MOVIE = `${moduleName}/ADD_FAVOURITE_MOVIE`;
export const DELETE_FAVOURITE_MOVIE = `${moduleName}/DELETE_FAVOURITE_MOVIE`;
export const ADD_WATCHED_MOVIE = `${moduleName}/ADD_WATCHED_MOVIE`;
export const CLEAR_HISTORY = `${moduleName}/CLEAR_HISTORY`;


// Reducer
const ReducerRecord = Record({
    movies: new OrderedSet([]),
    lastesMovies: null,
    sliderMovies: null,
    favouriteMovies: new OrderedSet([]),
    watchedMovies: new OrderedSet([])
});

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload, response } = action;

    switch (type) {
        case FETCH_MOVIES + SUCCESS:
            if (payload.cid === LATEST_MOVIES) return state.set('lastesMovies', response.GOMOV)
            if (payload.cid === SLIDER_MOVIES) return state.set('sliderMovies', response.GOMOV)
            return state.update('movies', movies => movies.add(response.GOMOV))

        case ADD_FAVOURITE_MOVIE:
            return state.update('favouriteMovies', favouriteMovies => favouriteMovies.add(payload.movie))

        case DELETE_FAVOURITE_MOVIE:
            return state.update('favouriteMovies', favouriteMovies => favouriteMovies.delete(
                favouriteMovies.find(movie => movie.id === payload.movie.id)
            ))

        case ADD_WATCHED_MOVIE:
            return state.update('watchedMovies', watchedMovies => watchedMovies.add(payload.movie))

        case CLEAR_HISTORY:
            return state.set('watchedMovies', new OrderedSet([]))

        default:
            return state
    }
}


// Action creators
export function addFavouriteMovie(movie) {
    return {
        type: ADD_FAVOURITE_MOVIE,
        payload: { movie }
    }
}

export function deleteFavouriteMovie(movie) {
    return {
        type: DELETE_FAVOURITE_MOVIE,
        payload: { movie }
    }
}

export function addWatchedMovie(movie) {
    return {
        type: ADD_WATCHED_MOVIE,
        payload: { movie }
    }
}

export function clearHistory() {
    return {
        type: CLEAR_HISTORY
    }
}


export function loadMovies(cid) {
    let type;
    if (cid === LATEST_MOVIES) type = LATEST_MOVIES;
    else if (cid === SLIDER_MOVIES) type = SLIDER_MOVIES;
    else type = `cat_id=${cid}`

    return (dispatch) => {
        fetch(
            `http://104.237.5.219/hdmovies2019/api.php?kod=com.hdmovies2019.freepopularmovies&${type}`
        )
            .then(res => res.json())
            .then(response =>
                dispatch({
                    type: FETCH_MOVIES + SUCCESS,
                    payload: { cid },
                    response
                })
            )
            .catch((error) =>
                dispatch({
                    type: FETCH_MOVIES + FAIL,
                    error
                })
            )
    }
}

// Selectors
export const getState = state => state[moduleName];
export const getGenresMovies = state => getState(state).movies;
export const getLastesMovies = state => getState(state).lastesMovies;
export const getSliderMovies = state => getState(state).sliderMovies;
export const getMovie = (state, id, cid) => getMovies(state, cid).find(movie => movie.id === id);

export const getMovies = (state, cid) => {
    const movies = getGenresMovies(state);
    const lastesMovies = getLastesMovies(state);
    const sliderMovies = getSliderMovies(state);
    const isFilled = movies || !lastesMovies || !sliderMovies;

    if (isFilled) {
        if (cid === LATEST_MOVIES) return lastesMovies;
        if (cid === SLIDER_MOVIES) return sliderMovies;
        return movies.find(selectedMovies => selectedMovies[0].cid === cid)
    }
}

export const getWatchedMovies = state => {
    const watchedMovies =  getState(state).watchedMovies.toArray();
    return watchedMovies.map(movie => (
        { ...getMovie(state, movie.id, movie.cid), cid: movie.cid, date: movie.date }
    ));
}

export const getFavouriteMovies = state => {
    const favouriteMovies = getState(state).favouriteMovies.toArray();
    return favouriteMovies.map(movie => (
        { ...getMovie(state, movie.id, movie.cid), cid: movie.cid }
    ));
}

export const getSearchedMovies = (state, str, filter) => {
    const movies = filter.length !== 0
        ? filter.map(filterParam => getMovies(state, filterParam))
        : getGenresMovies(state).toArray();

    return movies.length !== 0 && movies.reduce((acc, selectedMovies) => {
        return [...acc, selectedMovies.find(movie => matchStrings(movie.channel_title, str))]
    }, new Set()).filter(val => val)

}


