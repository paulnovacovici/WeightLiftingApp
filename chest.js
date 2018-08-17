import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, FlatList, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import StatusBar from './StatusBar'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Provider, connect } from 'react-redux'
import { fetchDataFromAPI, addDataToAPI } from './actions'

BigCricle = (props) => {
  return(
    <View style={styles.bigCricle}>
        <Text style={styles.maxText}> Max </Text>
        <Text style={styles.maxWeight}> {props.data.max} </Text>
    </View>
  )
}

class WeightInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    };
  }
  render() {
    return (
      <View
          style={{flex:1,alignItems:'center'}}>
        <Text style= {styles.largeText}> What weight did you do today? </Text>
        <View style={{flexDirection:'row'}}>
          <TextInput
            style={styles.textInput}
            value={this.state.inputText}
            onChangeText = {(text) => this.setState({inputText:text})}
            placeholder="Enter Weight"
            keyboardType="numeric"
            returnKeyType="send"
          />
          <TouchableHighlight style={{marginLeft:10, height:40,width:50, borderRadius:10, justifyContent:'center', alignItems: 'center', backgroundColor:'#F7B733', marginTop: 20}}
            onPress= { () => {
              // Adds text input to database
              this.props.addData({body:"chest", workout:"Flat Barbell", weight:parseInt(this.state.inputText,10), reps:"10x10"})
              this.setState({inputText:''})
            } }
            underlayColor='green'>
            <View >
              <Text style={{color:'#DFDCE3', fontWeight:'bold'}}>Send</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
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

class Chest extends Component {
  render() {
    var data = [this.props.data.workouts, this.props.data.reps]
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
              <BigCricle {...this.props}/>
            </View>
            <KeyboardAvoidingView
                style={{flex:1,alignItems:'center'}}
                behavior="padding">
                <WeightInput {...this.props}/>
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

function mapStateToProps(state) {
  return {
    data: state.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(fetchDataFromAPI()),
    addData: (weight) => dispatch(addDataToAPI(weight))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chest)
