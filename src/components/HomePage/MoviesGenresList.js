import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FlatList, View } from 'react-native'
import { loadGenres, getGenres, getLoading, getLoaded } from '../../ducks/genres'
import MoviesList from '../MoviesList'
import Loader from '../common/Loader'
import { LATEST_MOVIES } from '../../const'


const MoviesGenresList = ({ navigation }) => {
    const genres = useSelector(state => getGenres(state));
    const isLoading = useSelector(state => getLoading(state));
    const isLoaded = useSelector(state => getLoaded(state));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadGenres());
    }, [loadGenres]);


    return (
        !isLoaded || isLoading
            ? <Loader />
            : <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                <MoviesList
                    cid={LATEST_MOVIES}
                    categoryTitle={"New movie"}
                    navigation={navigation}
                />
                <FlatList
                    data={genres}
                    renderItem={
                        ({ item }) =>
                            <MoviesList
                                cid={item.cid}
                                categoryTitle={item.category_name}
                                navigation={navigation}
                            />
                    }
                    keyExtractor={item => item.cid}
                />
            </View>
    )
}


export default MoviesGenresList