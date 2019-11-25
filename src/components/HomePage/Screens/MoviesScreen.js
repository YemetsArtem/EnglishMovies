import React from 'react'
import { useSelector } from 'react-redux'
import { SafeAreaView, FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { getMovies } from '../../../ducks/movies'
import Movie from '../../Movie'

const MoviesScreen = ({ navigation }) => {
    const { cid, categoryTitle } = navigation.state.params;
    const movies = useSelector(state => getMovies(state, cid));

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={[styles.headerText, { fontSize: 35, width:80 }]}>↩</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>{categoryTitle}</Text>
            </View>
            <FlatList
                data={movies}
                numColumns={3}
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    headerContainer: {
        flexDirection: "row",
        alignSelf: "stretch",
        justifyContent: "space-between",
        paddingHorizontal: 8
    },
    headerText: {
        textAlignVertical:"center",
        letterSpacing: 1,
        paddingBottom: 7,
        fontSize: 28,
        fontWeight: "700",
        color: "white"
    }
});

export default MoviesScreen