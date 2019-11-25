import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { getGenres } from '../../ducks/genres'
import { getSearchedMovies } from '../../ducks/movies'
import {
    getSearchedStr,
    getFilterState,
    getFilter,
    setSearchedStr,
    changeFilterState,
    addFilter,
    deleteFilter
} from '../../ducks/search'
import Movie from '../Movie'


const SearchScreen = ({ navigation }) => {
    const genres = useSelector(state => getGenres(state));
    const search = useSelector(state => getSearchedStr(state));
    const isOpen = useSelector(state => getFilterState(state));
    const filter = useSelector(state => getFilter(state));
    const movies = useSelector(state => getSearchedMovies(state, search, filter));
    const dispatch = useDispatch();

    const selectFilter = (cid, isSelected) => {
        isSelected
            ? dispatch(deleteFilter(cid))
            : dispatch(addFilter(cid))
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#030818' }}>
            <View style={{ marginBottom: 1 }}>
                <View style={styles.searchContainer}>
                    <SearchBar
                        searchIcon={
                            <IconAntDesign
                                style={{ marginBottom: 5, opacity: 0.6 }}
                                name="search1"
                                size={25}
                                color="white"
                            />
                        }
                        containerStyle={styles.search}
                        inputContainerStyle={styles.search}
                        placeholder="Find movies..."
                        onChangeText={(str) => dispatch(setSearchedStr(str))}
                        value={search}
                    />
                </View>
                <TouchableOpacity onPress={() => dispatch(changeFilterState(!isOpen))}>
                    <View style={styles.button}>
                        <IconIonicons
                            name={isOpen ? "md-arrow-dropup" : "md-arrow-dropdown"}
                            color="white"
                            size={20}
                        />
                        <Text style={styles.buttonContent}>Filter</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {
                genres && isOpen &&
                <FlatList
                    style={{ paddingHorizontal: 55 }}
                    data={genres}
                    keyExtractor={item => item.cid}
                    renderItem={
                        ({ item }) => {
                            const isSelected = filter.some(param => param === item.cid);

                            return (
                                <TouchableOpacity onPress={() => selectFilter(item.cid, isSelected)}>
                                    <View style={styles.genreContainer}>
                                        <Text style={[
                                            isSelected ? styles.selectedGenre : styles.genre,
                                            { marginRight: 15 }
                                        ]}>
                                            {item.category_name}
                                        </Text>
                                        {
                                            isSelected &&
                                            <IconEntypo name="check" color="#007AFF" size={20} />
                                        }
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    }
                />
            }
            {
                movies.length !== 0
                    ? !isOpen &&
                    <FlatList
                        data={movies}
                        numColumns={3}
                        keyExtractor={item => item.id}
                        renderItem={
                            ({ item }) =>
                                <Movie
                                    id={item.id}
                                    cid={item.cid}
                                    title={item.channel_title}
                                    image={item.channel_thumbnail}
                                    key={item.id}
                                    navigation={navigation}
                                />
                        }
                    />
                    : !isOpen && <Text style={styles.title}>No found movies</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        borderWidth: 1,
        borderRadius: 25,
        borderColor: "white",
        marginVertical: 10,
        marginHorizontal: 10
    },
    search: {
        backgroundColor: '#030818',
        borderRadius: 25,
        maxHeight: 50
    },
    title: {
        flex: 1,
        textAlignVertical: "center",
        textAlign: "center",
        color: "white",
        fontSize: 20,
        fontWeight: "700"
    },
    button: {
        alignSelf: "flex-end",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#007AFF",
        borderRadius: 22,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 7,
        marginRight:12,
        width: 100
    },
    buttonContent: {
        fontSize: 17,
        color: "white",
        marginLeft: 3
    },
    genreContainer: {
        flex: 1,
        flexDirection: "row",
        marginVertical: 20
    },
    genre: {
        color: "#8C8C8C",
        fontSize: 18,
        fontWeight: "600"
    },
    selectedGenre: {
        color: "white",
        fontSize: 18,
        fontWeight: "700"
    }
});


export default SearchScreen
