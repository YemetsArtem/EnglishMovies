import React from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { getDate } from '../utils'
import { addWatchedMovie } from '../ducks/movies'


const Movie = ({ navigation, title, image, id, cid }) => {
    const dispatch = useDispatch();
    const date = getDate();

    const onPressHandler = () => {
        dispatch(addWatchedMovie({ id, cid, date }));
        navigation.navigate('Movie', { id, cid });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.5} onPress={onPressHandler}>
                <Image
                    source={{ uri: `http://104.237.5.219/hdmovies2019/images/${image}` }}
                    style={styles.image}
                />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width: 105,
        marginHorizontal: 5,
        paddingVertical: 10
    },
    image: {
        height: 150,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "gray",
        backgroundColor: "gray"
    },
    title: {
        color: "white",
        textAlign: "center",
        fontFamily: "cursive"
    }
});

export default Movie
