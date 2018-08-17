import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, FlatList, Image } from 'react-native';
import { Provider, connect } from 'react-redux'
import { changeBody, fetchDataFromAPI } from './actions'
import StatusBar from './StatusBar'

const {height, width} = Dimensions.get('window')

const App = (props) => {
  textColor = (num) => {
    switch(num){
      case 0:
        return {
          backgroundColor: '#4183D7'
        }
      case 1:
        return {
          backgroundColor: '#F89406'
        }
      case 2:
        return {
          backgroundColor: '#CF000F'
        }
      case 3:
        return {
          backgroundColor: '#4183D7'
        }
      case 4:
        return {
          backgroundColor: '#F89406'
        }
    }
  }

  onPressEvent = (index) => {
    switch (index) {
      case 0:
          props.changeBody('chest')
          props.navigation.navigate('Chest');
      case 1:
        return {
          backgroundColor: '#F89406'
        }
      case 2:
        return {
          backgroundColor: '#CF000F'
        }
      case 3:
        return {
          backgroundColor: '#4183D7'
        }
      case 4:
        return {
          backgroundColor: '#F89406'
        }
    }
  }
  renderItem = ({item, index, separators}) => {
    return(
      <TouchableHighlight underlayColor='green' onPress={() => onPressEvent(index)} onShowUnderlay={separators.highlight} onHideUnderlay={separators.unhighlight}>
        <View style={[styles.item, textColor(index)]}>
          {index == 0 && <Image style={styles.image} source={require('./img/icons8-bench-press-50.png')} />}
          {index == 1 && <Image style={styles.image} source={require('./img/icons8-bicep-50.png')} />}
          {index == 2 && <Image style={styles.image} source={require('./img/icons8-back-50.png')} />}
          {index == 3 && <Image style={styles.image} source={require('./img/icons8-shoulders-50.png')} />}
          {index == 4 && <Image style={styles.image} source={require('./img/icons8-legs-50.png')} />}
          <Text style={styles.itemText}>{item.key}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  itemSeparator = ({highlighted}) => {
    return (
      <View style={[{height:2,backgroundColor:'black'}, highlighted && {height:5}]}/>
    )
  }

    const { data, isFetching } = props.data

    return (
      <View style={{backgroundColor:'black'}}>
        <StatusBar/>
        <FlatList
          data={[
            {key:'Chest'},
            {key:'Arms'},
            {key:'Back'},
            {key:'Shoulders'},
            {key: 'Legs'}
          ]}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeparator}/>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      marginTop: 100,
      paddingLeft: 20,
      paddingRight: 20
    },
    text: {
      textAlign: 'center'
    },
    button: {
      backgroundColor: '#0b7eff',
      height: 60,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      color: 'white'
    },
    item: {
      height: height/3,
      justifyContent: 'center',
      alignItems: 'center'
    },
    itemText: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: 10
    },
    image: {
      height: 80,
      width: 80
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
    changeBody: (body) => dispatch(changeBody(body))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
