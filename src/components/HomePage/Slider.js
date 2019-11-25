import React, { useEffect, useRef } from 'react'
import { View, Text, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import { loadMovies, getMovies, addWatchedMovie } from '../../ducks/movies'
import { getDate } from '../../utils'
import Loader from '../common/Loader'
import { SLIDER_MOVIES } from '../../const'

const { width: screenWidth } = Dimensions.get('window')

const Slider = ({ navigation }) => {
    const movies = useSelector(state => getMovies(state, SLIDER_MOVIES));
    const dispatch = useDispatch();
    const date = getDate();
    const carouselRef = useRef(null);

    const onPressHandler = (id, cid) => {
        dispatch(addWatchedMovie({ id, cid, date }));
        navigation.navigate('Movie', { id, cid });
    }

    useEffect(() => {
        dispatch(loadMovies(SLIDER_MOVIES));
    }, []);


    return (
        movies
            ? <View style={styles.container}>
                <Carousel
                    ref={carouselRef}
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth - 100}
                    data={movies}
                    hasParallaxImages={true}
                    renderItem={({ item }, parallaxProps) => {
                        return (
                            <TouchableOpacity onPress={() => onPressHandler(item.id, SLIDER_MOVIES)}>
                                <ParallaxImage
                                    source={{ uri: `http://104.237.5.219/hdmovies2019/images/${item.channel_thumbnail}` }}
                                    containerStyle={styles.imageContainer}
                                    style={styles.image}
                                    parallaxFactor={0.7}
                                    id={item.id}
                                    {...parallaxProps}
                                />
                                <Text style={styles.title} numberOfLines={2}>
                                    {item.channel_title}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
            : <Loader />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        marginBottom: 50
    },
    title: {
        color: "#DADADA",
        alignSelf: "center",
        textAlign: "center",
        fontFamily: "serif",
        fontWeight: "700",
        fontSize: 15,
        width: screenWidth - 160
    },
    imageContainer: {
        flex: 1,
        position: 'relative',
        width: screenWidth - 100,
        height: screenWidth,
        marginBottom: Platform.select({ ios: 0, android: 1 })
    },
    image: {
        borderRadius: 3,
        resizeMode: 'contain',
        ...StyleSheet.absoluteFillObject
    },
})


export default Slider
