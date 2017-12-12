import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  Image,
  Text,
  View} from 'react-native';
  
  class DetailScreen extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {dataSource: ''};
  }
  
  componentDidMount() 
  {
    //this.getData(this.props.navigation.state.params.id);
  }

  render() 
  {
    let item = this.props.navigation.state.params.item;
    return (
      <Image style={styles.wallpaper} source={{uri: 'https://previews.123rf.com/images/yuliamalinovskaya/yuliamalinovskaya1601/yuliamalinovskaya160100132/51137936-Food-and-kitchen-seamless-pattern-Cute-background-with-line-icons-for-culinary-theme-Vector-illustra-Stock-Vector.jpg'}}>
        <View style={{flex:1, padding: 10, flexDirection: 'column', borderWidth: 1, borderColor: 'green'}}>
          <View style={{flex:1, height: 150, flexDirection: 'row', borderColor: '#1113', borderLeftWidth: 1, borderTopWidth: 1}}>
            <Image style={{flex: 1, backgroundColor: '#fff'}} source={{uri: item.image}} resizeMode='stretch'/>
            <View style={{justifyContent: 'space-between', flex: 1.125, flexDirection: 'column', borderLeftWidth: 2, borderColor: 'white'}}>
              <View style={{padding: 10, flex: 1.5, backgroundColor: '#ffda95',justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 20}}>
                <Text style={{fontSize: 32, textAlign: 'center'}}>{item.name}</Text>
              </View>
              <View style={{flexDirection: 'row', backgroundColor: item.effect ? 'coral' : 'cornflowerblue', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 22, color: 'white', }}>{item.effect ? 'Warming' : 'Cooling'} Effect</Text>
              </View>
            </View>
          </View>
          <View style={{flex:2, padding: 10, backgroundColor: '#C7FB93dd', borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
            <ScrollView>
              <Text style = {{fontSize: 21, lineHeight: 35}}>{item.description}</Text>
            </ScrollView>
          </View>
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

export default DetailScreen;