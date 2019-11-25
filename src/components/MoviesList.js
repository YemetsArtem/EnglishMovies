import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { loadMovies, getMovies } from '../ducks/movies'
import Movie from './Movie'
import Loader from './common/Loader'



const MoviesList = ({ navigation, cid, categoryTitle, disableLoading }) => {
    const movies = useSelector(state => getMovies(state, cid));
    const dispatch = useDispatch();

    useEffect(() => {
        !disableLoading && dispatch(loadMovies(cid));
    }, [loadMovies]);

    const onPressHandler = () => {
        navigation.navigate('Movies', { cid, categoryTitle })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{categoryTitle}</Text>
                <TouchableOpacity onPress={onPressHandler} number={0.3}>
                    <View style={{ width: 100 }}>
                        <Icon style={{ alignSelf: "flex-end" }} name="arrow-right" size={20} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
            {
                movies
                    ?
                    <FlatList
                        data={movies}
                        horizontal
                        keyExtractor={item => item.id}
                        renderItem={
                            ({ item }) =>
                                <Movie
                                    id={item.id}
                                    cid={cid}
                                    title={item.channel_title}
                                    image={item.channel_thumbnail}
                                    key={item.id}
                                    navigation={navigation}
                                />
                        }
                    />
                    : <Loader />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        color: "#DADADA",
        letterSpacing: 2,
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 28
    }
});

export default MoviesList
