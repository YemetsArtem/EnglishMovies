import React from 'react'
import { useSelector } from 'react-redux'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { getFavouriteMovies } from '../../ducks/movies'
import Movie from '../Movie'
import { parse } from '../../utils'


const FavouriteScreen = ({ navigation }) => {
    const movies = useSelector(state => getFavouriteMovies(state));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favourite movies</Text>
            {
                movies.length !== 0
                    ? <FlatList
                        data={movies}
                        keyExtractor={item => item.id}
                        renderItem={
                            ({ item }) => {
                                const movie = parse(item);

                                return (
                                    <View style={styles.movieContainer}>
                                        <View style={{ marginRight: 13 }}>
                                            <Movie
                                                id={movie.id}
                                                cid={movie.cid}
                                                title={movie.channel_title}
                                                image={movie.channel_thumbnail}
                                                key={movie.id}
                                                navigation={navigation}
                                            />
                                        </View>
                                        <View style={{ width: 230, paddingTop: 7 }}>
                                            <Text style={[styles.movieText, { marginBottom: 14 }]}>{`${movie.category_name}, ${movie.year}`}</Text>
                                            <Text style={styles.movieDesc}>{movie.description}</Text>
                                            <Text style={[styles.movieText, { marginVertical: 5 }]}>{movie.director}</Text>
                                            <Text style={styles.movieText}>{movie.stars}</Text>
                                        </View>
                                    </View>
                                )
                            }
                        }
                    />
                    : <Text style={styles.text}>No favourite movies</Text>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 5,
        backgroundColor: '#030818'
    },
    title: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
        paddingVertical: 15
    },
    movieContainer: {
        flex: 1,
        flexDirection: "row",
        borderTopColor: "white",
        borderBottomColor: "white",
        borderWidth: 1,
        paddingVertical: 5
    },
    movieDesc: {
        color: "white",
        fontSize: 13,
        fontWeight: "700",
        lineHeight: 18,
        fontFamily: "serif"
    },
    movieText: {
        color: "white",
        fontSize: 12,
        opacity: 0.5,
        lineHeight: 16,
        fontFamily: "serif"
    },
    text: {
        flex: 1,
        textAlignVertical: "center",
        textAlign: "center",
        color: "white",
        fontSize: 20,
        fontWeight: "700"
    }
});


export default FavouriteScreen
