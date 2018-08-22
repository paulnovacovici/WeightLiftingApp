import React, { Component } from 'react';
import {
  AppRegistry,
  Button
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
    navigationOptions: {
      title: 'Chest',
    },
  },
  History : {
    screen: HistoryScreen,
    header: {visible: false},
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
