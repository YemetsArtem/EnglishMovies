import { Record } from 'immutable'


export const moduleName = 'genres'
export const START = "_START";
export const SUCCESS = "_SUCCESS";
export const FAIL = "_FAIL";
export const FETCH_GENRES = `${moduleName}/FETCH_GENRES`;


// Reducer
const ReducerRecord = Record({
    requiredGenres: ['5', '6', '7', '8', '9', '10', '11', '12'],
    genres: null,
    loading: false,
    loaded: false
});

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload, response } = action;

    switch (type) {
        case FETCH_GENRES + START:
            return state.set('loading', true)

        case FETCH_GENRES + SUCCESS:
            return state
                .set(
                    'genres',
                    response.GOMOV.categorylist.filter(
                        (genre, i) => genre.cid === state.requiredGenres[i]
                    )
                )
                .set('loaded', true)
                .set('loading', false)

        default:
            return state
    }
}


// Action creators
export function loadGenres() {
    return (dispatch) => {
        dispatch({
            type: FETCH_GENRES + START
        })

        fetch("http://104.237.5.219/hdmovies2019/api.php?kod=com.hdmovies2019.freepopularmovies&home")
            .then(res => res.json())
            .then(response =>
                dispatch({
                    type: FETCH_GENRES + SUCCESS,
                    response
                })
            )
            .catch((error) =>
                dispatch({
                    type: FETCH_GENRES + FAIL,
                    error
                })
            )
    }
}


// Selectors
export const getState = state => state[moduleName];
export const getGenres = state => getState(state).genres;
export const getLoading = state => getState(state).loading;
export const getLoaded = state => getState(state).loaded;


