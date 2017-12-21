import React from 'react';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.19
import ListScreen from './ListScreen.js';
import DetailScreen from './DetailScreen.js';

ListScreen.navigationOptions = {
    title: 'List of Items',
    header: null,
    headerStyle: {
      backgroundColor: 'gray',
    },
    headerTintColor: 'red',
    headerTitleStyle: {
      fontSize: 30,
      color: '#ffc40c',
      alignSelf: 'center',
      fontFamily: 'serif',
    },
};

DetailScreen.navigationOptions = {
    title: 'Item Details',
    headerTitleStyle: {
      fontSize: 25,
      color: 'green',
      fontFamily: 'serif'
    },
};

const SimpleApp = StackNavigator({
  List: { screen: ListScreen },
  Detail: { screen: DetailScreen },
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}
