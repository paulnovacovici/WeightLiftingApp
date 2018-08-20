import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native'

import { Provider } from 'react-redux'
import configureStore from './configureStore'
import HomeScreen from './homeScreen'
import ChestScreen from './chest'
import HistoryScreen from './history'
import { createStackNavigator } from 'react-navigation';


const store = configureStore()

const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    header: {visible: false},
    navigationOptions: {
      title: 'Home',
      header: null
    },
  },
  Chest: {
    screen: ChestScreen,
    header: {visible: false},
    navigationOptions: {
      title: 'Home',
      header: null
    },
  },
  History : {
    screen: HistoryScreen,
    header: {visible: false},
    navigationOptions: {
      title: 'History',
      header: null
    },
  },
});

export default class ReduxTesting extends Component {

  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
