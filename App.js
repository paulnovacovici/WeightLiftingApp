import React, { Component } from 'react';
import {
  AppRegistry,
  Button
} from 'react-native'

import { Provider } from 'react-redux'
import configureStore from './configureStore'
import HomeScreen from './homeScreen'
import BodyScreen from './body'
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
  Body: {
    screen: BodyScreen,
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
