import React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  ListView,
  Alert,
  Image,
  Text,
  View} from 'react-native';
import data from './data.js'

class ListScreen extends React.Component {
  constructor(props) 
  {
    super(props);
    this.state = {
      sort: 0,
      effect: 2,
      dataSource: data.data,
      favourite: 0,
      marked: new Object(),
    };
    this.sortButtonPressed = this.sortButtonPressed.bind(this);
    this.effectButtonPressed = this.effectButtonPressed.bind(this);
    this.favouriteButtonPressed = this.favouriteButtonPressed.bind(this);
  }
  
  componentWillMount() 
  {
    AsyncStorage.getItem('Marked').then((item) => {
      let temp = JSON.parse(item);
      if(temp)
        this.setState({marked: temp});
      console.log(temp);
    });
  }
  
  _onLongPress(name)
  {
    let marked = this.state.marked;
    if(marked.hasOwnProperty(name) && marked[name])
      marked[name] = 0;
    else
      marked[name] = 1;
    this.setState({marked: marked});
    AsyncStorage.setItem('Marked', JSON.stringify(marked)).then(() => {console.log('Saved');
      AsyncStorage.getItem('Marked').then((item) => {console.log(JSON.parse(item));
        if(marked[name])
          Alert.alert('Added ' + name + ' To Favourite');
      });
    });
  }
  
  AlphabetSort(a, b)
  {
    let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
    if (nameA < nameB)
      return -1;
    if (nameA > nameB)
      return 1;
     return 0;
  }
  
  sortButtonPressed()
  {
    this.listView.scrollTo({x: 0, y: 0, animated: false});
    let temp = this.state.sort;
    temp  = temp ? 0 : 1;
    this.setState({sort: temp});
  }
  
  sortButton()
  {
    return <TouchableHighlight onPress={this.sortButtonPressed} underlayColor='#90e060' style={{flex: 1, marginHorizontal: 5, borderWidth: 4, borderColor: '#7CDC68', borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4BC132'}}>
          <View>
            <Text style={{fontSize: 27, fontWeight: 'bold', color: 'white'}}>{this.state.sort ? 'Z ➙ A' : 'A ➙ Z'}</Text>
          </View>
        </TouchableHighlight>
  }
  
  effectButtonPressed()
  {
    this.listView.scrollTo({x: 0, y: 0, animated: false});
    let temp = this.state.effect;
    temp += 1;
    if(temp > 2)
      temp = 0;
    this.setState({effect: temp});
  }
  
  effectButton()
  {
    let temp = this.state.effect;
    var txt = '\u200A';
    if(temp == 0)
    {
        return <TouchableHighlight onPress={this.effectButtonPressed} underlayColor='#93b8fc' style={{flex: 1, marginHorizontal: 5, borderWidth: 3, borderColor: 'white', borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'cornflowerblue'}}>
              <View>
                <Text style={{fontSize: 24, color: 'white'}}>Cooling</Text>
              </View>
            </TouchableHighlight>
    }
    else if(temp == 1)
    {
        return <TouchableHighlight onPress={this.effectButtonPressed} underlayColor='#ff8e64' style={{flex: 1, marginHorizontal: 5, borderWidth: 3, borderColor: 'whitesmoke', borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'coral'}}>
              <View>
                <Text style={{fontSize: 24, color: 'white'}}>Warming</Text>
              </View>
            </TouchableHighlight>
    }
    else
    {
        return <TouchableHighlight onPress={this.effectButtonPressed} underlayColor='#888' style={{flex: 1, marginHorizontal: 5, borderWidth: 3, borderColor: 'darkgray', borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray'}}>
              <View>
                <Text style={{fontSize: 24, color: 'white'}}>
                  A{txt}L{txt}L
                </Text>
              </View>
            </TouchableHighlight>
    }
  }
  
  favouriteButtonPressed()
  {
    this.listView.scrollTo({x: 0, y: 0, animated: false})
    let temp = this.state.favourite;
    this.setState({favourite: !temp});
  }
  
  favouriteButton()
  {
    let temp = this.state.favourite;
    if(!temp)
    {
      return <TouchableWithoutFeedback onPress={this.favouriteButtonPressed}>
          <View style={{flex: 0.5, marginHorizontal: 5, borderWidth: 3, borderColor: 'darkgray', borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray'}}>
              <Text style={{fontSize: 33, color: 'white'}}>★</Text>
            </View>
          </TouchableWithoutFeedback>
    }
    else
    {
      return <TouchableWithoutFeedback onPress={this.favouriteButtonPressed}>
          <View style={{flex: 0.5, marginHorizontal: 5, borderWidth: 3, borderColor: 'goldenrod', borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow'}}>
              <Text style={{fontSize: 33, color: 'orange'}}>★</Text>
            </View>
          </TouchableWithoutFeedback>
    }
  }
  
  setData()
  {
    let temp = data.data.slice();
    if(this.state.favourite)
    {
      let marked = this.state.marked;
      temp = temp.filter(function(item) {return (marked.hasOwnProperty(item.name) && marked[item.name])});
    }
    if(this.state.effect < 2)
    {
      let effect = this.state.effect;
      temp = temp.filter(function(item) {return item.effect == effect});
    }
    temp = temp.sort(this.AlphabetSort);
    if(this.state.sort)
      temp = temp.reverse();
    return temp;
  }
  
  showData(rowData)
  {
    const {navigate} = this.props.navigation;
    let marked = this.state.marked;
    return (
      <TouchableOpacity onPress={() => navigate('Detail', {item: rowData})} delayLongPress={2000} onLongPress={() => {this._onLongPress(rowData.name)}}>
        <View style = {{flexDirection: 'row', height: 100, backgroundColor: 'white', opacity: 0.8}}>
          <View style = {{flex:2.5, padding: 5}}>
            <View style = {{flex:1, padding: 5, backgroundColor: rowData.effect ? 'coral' : 'cornflowerblue'}}>
              <Image style = {{height: 80, backgroundColor: 'white'}} source={{uri: rowData.image}}/>
            </View>
          </View>
          <View style = {{flex:7.5, padding: 10, alignItems: 'center', flexDirection: 'row'}}>
            <Text style = {{flex: 1, fontSize: 25}}>
              {rowData.name}
            </Text>
            <Text style={{color: 'gold', textAlign: 'right', fontSize: 40}}>
              {(marked.hasOwnProperty(rowData.name) && marked[rowData.name]) ? '★' : ''}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      )
  }

  render() 
  {
    let temp = this.setData();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if (this.state.isLoading) {
      return (
        <View style = {{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <Image style={styles.wallpaper} source={{uri: 'https://t4.ftcdn.net/jpg/00/77/52/05/500_F_77520557_BHp5eNeZs7DAaLuysLiNFYXkO6uE76e8.jpg'}}>
        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 5}}>
          <View style={{height: 5, backgroundColor: 'transparent'}}/>
          <View style={{height: 50, padding: 5, paddingBottom: 0, backgroundColor: '#1117', flexDirection: 'row'}}>
            {this.sortButton()}
            {this.effectButton()}
            {this.favouriteButton()}
          </View>
          <View style={{height: 5, backgroundColor: '#1119'}}/>
          <ListView
            ref = {ref => this.listView = ref}
            style = {{flex:1, borderWidth: 1, borderColor: '#3333'}}
            dataSource = {ds.cloneWithRows(temp)}
            enableEmptySections = {true}
            renderRow = {rowData => this.showData(rowData)}
            renderSeparator = {(sectionID, rowID, adjacentRowHighlighted) => <View key = {rowID} style = {{height : 2, backgroundColor: 'lightgray'}}/>}
          />
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  wallpaper: {
    flex: 1,
    width: null,
    height: null,
  }
});

export default ListScreen;