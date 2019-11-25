import React from 'react'
import { SafeAreaView, FlatList, View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Slider from '../Slider'
import MoviesGenresList from '../MoviesGenresList'


const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <TouchableHighlight onPress={() => navigation.navigate('History')}>
                <View style={styles.header}>
                    <Text style={styles.title}>History</Text>
                    <Icon name="history" size={30} color="white" />
                </View>
            </TouchableHighlight>

            <FlatList
                data={["Home page"]}
                keyExtractor={(item) => item}
                renderItem={() =>
                    <>
                        <Slider navigation={navigation} />
                        <MoviesGenresList navigation={navigation} />
                    </>
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row", 
        justifyContent: "flex-end",
        paddingVertical:5
    },
    title: {
        color: "white", 
        fontSize: 20, 
        fontFamily: "serif",
        letterSpacing: 1, 
        textTransform: "uppercase", 
        marginRight: 10,
        paddingTop:1
    }
});

export default Home
