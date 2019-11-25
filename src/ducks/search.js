import { Record, OrderedSet } from 'immutable'


export const moduleName = 'search'
export const SET_SEARCHED_STR = `${moduleName}/SET_SEARCHED_STR`;
export const CHANGE_FILTER_STATE = `${moduleName}/SET_OPEN_FILTER`;
export const ADD_FILTER = `${moduleName}/ADD_FILTER`;
export const DELETE_FILTER = `${moduleName}/DELETE_FILTER`;


// Reducer
const ReducerRecord = Record({
    searchedStr: "",
    isOpen: false,
    filter: new OrderedSet([])
});

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action;

    switch (type) {
        case SET_SEARCHED_STR:
            return state.set('searchedStr', payload.str)

        case CHANGE_FILTER_STATE:
            return state.set('isOpen', payload.filterState)

        case ADD_FILTER:
            return state.update('filter', filter => filter.add(payload.filterParam))

        case DELETE_FILTER:
            return state.update(
                    'filter',
                    filter => filter.delete(
                        filter.find(filterParam => filterParam === payload.filterParam)
                    )
                )
            
        default:
            return state
    }
}


// Action creators
export function setSearchedStr(str) {
    return {
        type: SET_SEARCHED_STR,
        payload: { str }
    }
}

export function changeFilterState(filterState) {
    return {
        type: CHANGE_FILTER_STATE,
        payload: { filterState }
    }
}

export function addFilter(filterParam) {
    return {
        type: ADD_FILTER,
        payload: { filterParam }
    }
}

export function deleteFilter(filterParam) {
    return {
        type: DELETE_FILTER,
        payload: { filterParam }
    }
}

// Selectors
export const getState = state => state[moduleName];
export const getSearchedStr = state => getState(state).searchedStr;
export const getFilterState = state => getState(state).isOpen;
export const getFilter = state => getState(state).filter.toJS();
