import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, FlatList, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import StatusBar from './StatusBar'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

BigCricle = () => {
  return(
    <View style={styles.bigCricle}>
        <Text style={styles.maxText}> Max </Text>
        {/* pull below text from database*/}
        <Text style={styles.maxWeight}> 250 </Text>
    </View>
  )
}

WeightInput = () => {
  return (
    <View
        style={{flex:1,alignItems:'center'}}>
      <Text style= {styles.largeText}> What weight did you do today? </Text>
      <View style={{flexDirection:'row'}}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Weight"
          keyboardType="numeric"
          returnKeyType="send"
        />
        <TouchableHighlight>
          <View style={{marginLeft:10, height:40,width:50, borderRadius:10, justifyContent:'center', alignItems: 'center', backgroundColor:'#F7B733', marginTop: 20}}>
            <Text style={{color:'#DFDCE3', fontWeight:'bold'}}>Send</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}

HistoryButton = () => {
  return (
    <TouchableHighlight style={{height:75, backgroundColor:'#F7B733'}}>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={styles.historyText}> History </Text>
      </View>
    </TouchableHighlight>
  )
}

export default class Chest extends Component {
  render() {
    var data = [["Flat Barbell", "Incline Barbell", "Chest Fly Dumbbell", "Flat Dumbbell", "Incline Dumbbell"], ["4x10","5x5","4x10","4x6"]]
    return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{flex:1, backgroundColor: '#4ABDAC'}}>
        <StatusBar/>
        <View style={{flex:1}}>
          <DropdownMenu
              bgColor={'white'}
              tintColor={'#666666'}
              activityTintColor={'green'}
              data={data}>
            <View style={{flex:2, justifyContent:'center', alignItems: 'center'}}>
              <BigCricle/>
            </View>
            <KeyboardAvoidingView
                style={{flex:1,alignItems:'center'}}
                behavior="padding">
                <WeightInput/>
            </KeyboardAvoidingView>
            <HistoryButton/>
        </DropdownMenu>
        </View>
      </View>
    </TouchableWithoutFeedback>)
  }
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  bigCricle : {
    width: 250,
    height: 250,
    backgroundColor: '#FC4A1A',
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  maxText : {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10
  },
  historyText : {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#DFDCE3'
  },
  maxWeight : {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'yellow'
  },
  largeText: {
    fontSize: 25,
    marginTop: 40,
    color: 'white'
  },
  textInput: {
    width: 130,
    height:40,
    paddingLeft: 20,
    marginTop: 20,
    backgroundColor: '#2a7064',
    borderRadius: 30
  }
});