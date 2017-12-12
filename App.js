import React from 'react';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.19
import ListScreen from './ListScreen.js';
import DetailScreen from './DetailScreen.js';

const SimpleApp = StackNavigator({
  List: {screen: ListScreen},
  Detail: {screen: DetailScreen},
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}
