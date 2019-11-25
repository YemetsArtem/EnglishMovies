import { combineReducers } from 'redux'
import genresReducer, {moduleName as genresModule} from '../ducks/genres'
import moviesReducer, {moduleName as moviesModule} from '../ducks/movies'
import searchReducer, {moduleName as searchModule} from '../ducks/search'


const createRootReducer = combineReducers({
  [moviesModule]: moviesReducer,
  [genresModule]: genresReducer,
  [searchModule]: searchReducer,
});

export default createRootReducer