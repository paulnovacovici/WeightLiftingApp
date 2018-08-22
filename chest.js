import React, { Component } from 'react';
import { TextInput, Button, Modal, StyleSheet, Text, View, TouchableHighlight, Dimensions, FlatList, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import StatusBar from './StatusBar'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Provider, connect } from 'react-redux'
import {  addDataToAPI, changeWorkout, changeReps, changeMax, addWorkoutToAPI } from './actions'
import DialogInput from 'react-native-dialog-input';
import { Icon } from 'react-native-elements'

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
              this.props.addData({body:this.props.data.body, workout:this.props.data.curWorkout, weight:parseInt(this.state.inputText,10), reps:this.props.data.curReps})
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

HistoryButton = (props) => {
  return (
    <TouchableHighlight
      style={{height:75, backgroundColor:'#F7B733'}}
      onPress={() => props.navigation.navigate('History')}
      underlayColor='green'>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={styles.historyText}> History </Text>
      </View>
    </TouchableHighlight>
  )
}

class Prompt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputText: ''
    }
  }
  render() {
    return (
      <Modal
          animationType="fade"
          visible={this.props.isVisible}
          transparent={true}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={styles.modalContainer}>
            <View style={styles.modalContainer}>
              <View style={styles.dialogBox}>
                <TextInput
                  value={this.state.inputText}
                  onChangeText = {(text) => this.setState({inputText:text})}
                  style={{fontSize:30}}
                  placeholder="Add Workout"
                />
                <View style={{flexDirection:'row'}}>
                  <Button
                    onPress={() =>{
                      this. props.toggleVisibility();
                      this.setState({inputText:''})
                    }}
                    title = "Cancel"
                  />
                  <Button
                    onPress={() => {
                      this.props.addWorkout({workout:this.state.inputText, body:this.props.data.body});
                      this.setState({inputText:''})
                      this. props.toggleVisibility()
                    }}
                    title = "Ok"
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
    )
  }
}

class Chest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDialogVisible: false
    }
  }

  _toggleVisibility = () => {
    this.setState({ isDialogVisible: !this.state.isDialogVisible });
  };

  componentDidMount() {
    this.props.navigation.setParams({ toggleVisibility: this._toggleVisibility });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableHighlight
          underlayColor='gray'
          onPress={navigation.getParam('toggleVisibility')}
          style={{marginRight:5}}
        >
          <Icon
              name='add'
              size={30}
              color='black'/>
        </TouchableHighlight>
      ),
    };
  }

  render() {
    var data = [this.props.data.workouts, this.props.data.reps]
    return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{flex:1, backgroundColor: '#4ABDAC'}}>
        {/*<StatusBar/>*/}
        <Prompt isVisible={this.state.isDialogVisible} toggleVisibility={this._toggleVisibility} {...this.props}/>
        <View style={{flex:1}}>
          <DropdownMenu
              bgColor={'white'}
              tintColor={'#666666'}
              activityTintColor={'green'}
              handler={(selection, row) => {
                if (selection == 0) {
                  this.props.changeWorkout(data[selection][row]);
                  this.props.changeMax({workout:data[0][row], reps:this.props.data.curReps, body: this.props.data.body})
                }
                else {
                  this.props.changeReps(data[selection][row]);
                  this.props.changeMax({workout:this.props.data.curWorkout, reps:data[1][row], body: this.props.data.body})
                }
              }}
              data={data}>
            <View style={{flex:2, justifyContent:'center', alignItems: 'center'}}>
              <BigCricle {...this.props}/>
            </View>
            <KeyboardAvoidingView
                style={{flex:1,alignItems:'center'}}
                behavior="padding">
                <WeightInput {...this.props}/>
            </KeyboardAvoidingView>
            <HistoryButton {...this.props}/>
        </DropdownMenu>
        </View>
      </View>
    </TouchableWithoutFeedback>)
  }
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  dialogBox : {
    backgroundColor:'#FFFFFFE0',
    borderRadius: 30,
    alignItems: 'center',
    padding: 8
  },
  bigCricle : {
    width: 250,
    height: 250,
    backgroundColor: '#FC4A1A',
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer : {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
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
    data: state.data,
    history: state.history
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addData: (data) => dispatch(addDataToAPI(data)),
    changeWorkout: (workout) => dispatch(changeWorkout(workout)),
    changeReps: (reps) => dispatch(changeReps(reps)),
    changeMax: (max) => dispatch(changeMax(max)),
    addWorkout: (data) => dispatch(addWorkoutToAPI(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chest)
