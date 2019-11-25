import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconFeather from 'react-native-vector-icons/Feather'
import HomeScreen from './HomePage/Screens/HomeScreen'
import MoviesScreen from './HomePage/Screens/MoviesScreen'
import MovieScreen from './HomePage/Screens/MovieScreen'
import SearchScreen from './SearchPage/SearchScreen'
import HistoryScreen from './HistoryPage/HistoryScreen'
import FavouriteScreen from './FavouritePage/FavouriteScreen'


const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        Movie: MovieScreen,
        Movies: MoviesScreen,
        History: HistoryScreen
    },
    {
        mode: 'modal',
        headerMode: 'none',
        cardStyle: { backgroundColor: '#030818' },
        initialRouteName: 'Home'
    }
);


const Navigator = createBottomTabNavigator(
    {
        Favourite: {
            screen: FavouriteScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <IconFontAwesome name="heart" size={30} color={tintColor} />
            }
        },
        Home: {
            screen: HomeStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <IconFeather name="home" size={30} color={tintColor} />
            }
        },
        Search: {
            screen: SearchScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <IconFontAwesome name="search" size={30} color={tintColor} />
            }
        }
    },
    {
        initialRouteName: 'Home',
        mode: 'modal',
        headerMode: 'none',
        tabBarOptions: {
            showLabel: false,
            lazyLoad: true,
            activeTintColor: 'white',
            inactiveTintColor: 'gray',
            labelStyle: {
                fontSize: 12,
                fontWeight: "600"
            },
            style: {
                height: 60,
                backgroundColor: '#030818',
                borderTopColor: "transparent",
                paddingVertical: 5
            }
        }
    }
);

export default createAppContainer(Navigator)