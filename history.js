import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, FlatList } from 'react-native';
import { List, ListItem} from 'react-native-elements';
import StatusBar from './StatusBar'
import { connect } from 'react-redux'
import { fetchHistoryFromAPI, removeDataFromAPI } from './actions'
import Swipeout from 'react-native-swipeout';


class History extends Component {

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  componentWillMount() {
    var data = {body: this.props.data.body, workout: this.props.data.curWorkout, reps: this.props.data.curReps}
    this.props.fetchHistory(data)
  }

  render() {
  return (
    <View style={{flex:1}}>
      {/*<StatusBar/>*/}
      {/*HEADER*/}
      <View style={{backgroundColor:'black', height:60, justifyContent: 'center', alignItems: 'center'}} >
        <Text style={{color:'white'}}> {this.props.data.curWorkout} </Text>
        <Text style={{color:'white'}}> {this.props.data.curReps} </Text>
      </View>
      {/*LIST*/}
      <View style={{flex:1}}>
        <List containerStyle={{flex:1, marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data = {this.props.history.data}
            renderItem = {(rowData) => {
              let swipeBtns = [{
                text: 'Delete',
                type: 'delete',
                backgroundColor: 'red',
                onPress: () => {
                  /*Delete row index in redux*/
                  this.props.removeData({body:this.props.data.body, workout: this.props.data.curWorkout, reps: this.props.data.curReps, date: rowData.item.date, index: rowData.index})
                }
              }];

              return (
                <Swipeout right={swipeBtns}
                  autoClose={true}
                  backgroundColor= 'transparent'>
                  {/* View of items in list */}
                  <View style={{flexDirection:'row', height:50}}>
                    <View style={{flex:1}}>
                      <Text style={styles.itemStyle}>{rowData.item.date}</Text>
                    </View>
                    <View style={{flex:1}}>
                      <Text style={styles.itemStyle}> {rowData.item.weight + "lbs"}</Text>
                    </View>
                  </View>
                  </Swipeout>
                )}}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor = {(item, index) => index.toString()}
          />
        </List>
      </View>
    </View>
  )}
}

const styles = StyleSheet.create({
  itemStyle: {
    fontSize: 30,
    padding: 2,
  }
})

function mapStateToProps(state) {
  return {
    data: state.data,
    history: state.history
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchHistory: (data) => dispatch(fetchHistoryFromAPI(data)),
    removeData: (data) => dispatch(removeDataFromAPI(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)
