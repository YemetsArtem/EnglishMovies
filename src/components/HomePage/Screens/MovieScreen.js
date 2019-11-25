import React, { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { WebView } from 'react-native-webview'
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { parse } from '../../../utils'
import { getMovie, addFavouriteMovie, deleteFavouriteMovie } from '../../../ducks/movies'
import { getFavouriteMovies } from '../../../ducks/movies'
import MoviesList from '../../MoviesList'


const MovieScreen = ({ navigation }) => {
    const { cid, id } = navigation.state.params;
    const initMovie = useSelector(state => getMovie(state, id, cid));
    const movie = parse(initMovie);
    const favouriteMovies = useSelector(state => getFavouriteMovies(state));
    const dispatch = useDispatch();

    let isFavourite = useMemo(() => favouriteMovies.some(movie => movie.id === id), [movie]);
    const menuItems = ["description", "director", "writers", "stars"];
    const [openedMenuItem, setOpenedMenuItem] = useState(menuItems[0]);
    const [isTrailerOpened, setTrailerOpened] = useState(false);

    const onPressHandler = () => {
        isFavourite
            ? dispatch(deleteFavouriteMovie({ id, cid }))
            : dispatch(addFavouriteMovie({ id, cid }));
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.arrowContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.arrow}>↩</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={{ position: "relative", marginRight: 30 }}>
                            <Image
                                style={styles.image}
                                source={{ uri: `http://104.237.5.219/hdmovies2019/images/${movie.channel_thumbnail}` }}
                            />
                            <TouchableOpacity
                                onPress={onPressHandler}
                                style={styles.heard}
                            >
                                <IconAntDesign name={isFavourite ? "heart" : "hearto"} color="white" size={30} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.headerTitle}>{movie.title}</Text>
                            <Text style={styles.headerInfo}>Year:      {movie.year}</Text>
                            <Text style={styles.headerInfo}>Genre:     {movie.category_name}</Text>
                            {
                                movie.trailer &&
                                <TouchableOpacity onPress={() => setTrailerOpened(!isTrailerOpened)}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonContent}>
                                            {isTrailerOpened ? "Hide trailer" : "Watch trailer"}
                                        </Text>
                                        <IconIonicons
                                            name={isTrailerOpened ? "md-arrow-dropup" : "md-arrow-dropdown"}
                                            color="white"
                                            size={0}
                                        />
                                    </View>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>

                    {
                        movie.trailer && isTrailerOpened &&
                        <WebView
                            style={styles.videoContainer}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            cacheEnabled={true}
                            source={{ uri: movie.trailer }}
                        />
                    }

                    <View style={styles.menu}>
                        {
                            menuItems.map(item => {
                                const isOpened = item === openedMenuItem;

                                return <View key={item}>
                                    <TouchableOpacity
                                        style={isOpened && styles.menuItemActive}
                                        onPress={() => setOpenedMenuItem(item)}
                                    >
                                        <Text style={[styles.menuItemText, isOpened && { color: "#007AFF" }]}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            })
                        }
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.description}>{movie[openedMenuItem]}</Text>
                    </View>

                    <MoviesList
                        disableLoading
                        navigation={navigation}
                        cid={cid}
                        categoryTitle="Related movies"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    arrowContainer: {
        position: "absolute",
        top: -7,
        zIndex: 10
    },
    arrow: {
        fontSize: 35,
        fontWeight: "700",
        color: "white",
        opacity: 0.7
    },

    heard: {
        position: "absolute",
        right: 0
    },

    content: {
        flex: 1,
        paddingVertical: 10
    },

    header: {
        flexDirection: "row",
        marginBottom: 20,
        marginTop: 25,
        paddingHorizontal: 15,
    },
    headerTitle: {
        width: 200,
        marginBottom: 15,
        color: "white",
        fontSize: 21,
        fontWeight: "700",
        letterSpacing: 1
    },
    headerInfo: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        opacity: 0.7
    },

    button: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#007AFF",
        borderRadius: 15,
        paddingVertical: 7,
        paddingHorizontal: 9,
        marginTop: 10,
        width: 128
    },
    buttonContent: {
        fontSize: 11,
        textTransform: "uppercase",
        color: "white",
        letterSpacing: 1,
        marginRight: 7
    },

    menu: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    menuItemActive: {
        borderBottomWidth: 2,
        borderBottomColor: "#007AFF"
    },
    menuItemText: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
        fontFamily: "serif",
        textTransform: "capitalize",
        opacity: 0.8
    },

    infoContainer: {
        minHeight: 145,
        paddingHorizontal: 10,
    },
    description: {
        color: "white",
        fontSize: 16,
        lineHeight: 22,
        opacity: 0.7
    },

    videoContainer: {
        height: 205,
        marginBottom: 20
    },

    imageBackground: {
        flex: 1,
        height: 220,
        opacity: 0.3
    },
    image: {
        width: 120,
        height: 198,
        borderRadius: 10
    }
});


export default MovieScreen
