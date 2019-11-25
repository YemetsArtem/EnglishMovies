import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { getWatchedMovies, clearHistory } from '../../ducks/movies'
import Movie from '../Movie'
import { getRandomID } from '../../utils'


const HistoryScreen = ({ navigation }) => {
    const movies = useSelector(state => getWatchedMovies(state));
    const dispatch = useDispatch();

    const onPressHandler = () => dispatch(clearHistory());

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.headerText}>↩</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressHandler} style={styles.button}>
                    <Text style={styles.buttonText}>Clear history</Text>
                </TouchableOpacity>
            </View>
            {
                movies.length !== 0
                    ? <View style={{ paddingBottom: 40 }}>
                        <FlatList
                            data={movies}
                            keyExtractor={item => item.id + getRandomID()}
                            renderItem={
                                ({ item }) =>
                                    <View style={{ flexDirection: "row" }}>
                                        <Movie
                                            id={item.id}
                                            cid={item.cid}
                                            title={item.channel_title}
                                            image={item.channel_thumbnail}
                                            navigation={navigation}
                                        />
                                        <View style={{ width: 200, padding: 10 }}>
                                            <Text style={styles.title}>{item.channel_title}</Text>
                                            <Text style={styles.date}>Watched at: {item.date}</Text>
                                        </View>
                                    </View>
                            }
                        />
                    </View>
                    : <Text style={styles.text}>No watched movies</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#030818'
    },
    headerText: {
        textAlignVertical:"center",
        letterSpacing: 1,
        paddingBottom: 7,
        fontSize: 28,
        fontWeight: "700",
        color: "white",
        fontSize: 35, 
        width: 80
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        paddingVertical: 3,
        paddingHorizontal:7,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 15
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        letterSpacing: 2
    },
    title: {
        color: "white",
        fontSize: 18,
        marginBottom: 6
    },
    date: {
        color: "white",
        fontSize: 16,
        opacity: 0.6
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

export default HistoryScreen

