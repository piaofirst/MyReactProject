/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  Navigator
} from 'react-native';

class Greeting extends Component{
  render(){
    return(
      <Text> Hello {this.props.name}!</Text>
    );
  }
}

class Blink extends Component{
  constructor(props){
    super(props);
    this.state = {showText: true };
    // 每1000毫秒对showText状态做一次取反操作
    setInterval(()=>{
      this.setState({showText: !this.state.showText });
    }, 1000);
  }

  render(){
    // 根据当前showText的值决定是否显示text内容
    let display = this.state.showText ? this.props.text : " ";
    return(
      <Text>{display}</Text>
    );
  }
}
export default class MyReactProject extends Component {
  render() {
    let pic = {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        // uri:'http://atth.jzb.com/forum/201108/07/163911t345nglb8sldnz8c.jpg'
    };
    return (
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>
      //     Welcome to React Native!
      //   </Text>
      //   <Text style={styles.instructions}>
      //     To get started, edit index.android.js
      //   </Text>
      //   <Text style={styles.instructions}>
      //     Double tap R on your keyboard to reload,{'\n'}
      //     Shake or press menu button for dev menu
      //   </Text>
      //   <Text style={styles.welcome}>Hello world!</Text>
      //   <Image source={pic} style={{width: 193, height: 110}}></Image>
      // </View>
      // <Text>Hello world!</Text>
      // <View style={styles.container}>
      // // <Image source={pic} style={{width: 193, height: 110}} />
      // <Text style={styles.welcome}>Hello world!</Text>
      // </View>
      // <View style={{alignItems: 'center'}}>
      //   <Greeting name='Rexxar'/>
      //   <Greeting name='Jaina'/>
      //   <Greeting name='Valeera'/>
      // </View>
      
      // <View>
      //   <Blink text='I love to blink' />
      //   <Blink text='Yes blinking is so great' />
      //   <Blink text='Why did they ever take this out of HTML' />
      //   <Blink text='Look at me look at me look at me' />
      // </View>
      <View>
        <Text style={styles.red}>just red</Text>
        <Text style={styles.bigblue}>just bigblue</Text>
        <Text style={[styles.bigblue, styles.red]}>bigblue, then red</Text>
        <Text style={[styles.red, styles.bigblue]}>red, then bigblue</Text>
      </View>
    );
  }
}
class FixedDimensionsBasics extends Component{
  render(){
    return(
        <View style={{
          flex: 1, 
          // flexDirection: 'row',
          flexDirection: 'column',
          // justifyContent: 'flex-start',
          justifyContent: 'center',
          // justifyContent: 'flex-end',
          // justifyContent: 'space-around',
          // justifyContent: 'space-between',
          // alignItems: 'flex-start'
          alignItems: 'center'
          // alignItems: 'flex-end'
          // alignItems: 'stretch'
          }}>
          <View style={{width:50, height: 50, backgroundColor:'powderblue'}}/>
          <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}}/>
          <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}}/>
        </View>
        // 试试去掉父View中的`flex: 1`。
      // 则父View不再具有尺寸，因此子组件也无法再撑开。
      // 然后再用`height: 300`来代替父View的`flex: 1`试试看？
        // <View style={{flex: 1}}>
        //   <View style={{flex: 1,backgroundColor:'powderblue'}}/>
        //   <View style={{flex: 2,backgroundColor:'skyblue'}}/>
        //   <View style={{flex: 3,backgroundColor:'steelblue'}}/>
        // </View>
    );
  }
};

class PizzaTranslator extends Component{
  constructor(props){
    super(props);
    this.state = {text: ''};
  }
  render(){
    return(
      <View style={{padding: 10}}>
        <TextInput 
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
      </View>
    );
  }
}

class ListViewBasics extends Component{
  //初始化模拟数据
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
          'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }
  render(){
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }
}

import MyScene from './MyScene';

class YoDawgApp extends Component{
  render(){
    return(
      <MyScene/>
    )
  }
}

class SimpleNavigationApp extends Component{
  render(){
    return(
      <Navigator
        initialRoute={{ title: 'My Initial Scene', index: 0}}
        renderScene={(route, navigator) => 
          <MyScene
            title={route.title}
            //Function to call when a new scene should be displayed
            onForward={ () => {
              const nextIndex = route.index + 1;
              navigator.push({
                title: 'Scene' + nextIndex,
                index: nextIndex,
              });
            }}

            //Function to call to go back to the previous scene
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  bigblue:{
    color: 'blue',
    fontWeight: 'bold',
    fontSize:30,
  },
  red:{
    color: "red"
  },
});

// AppRegistry.registerComponent('MyReactProject', () => MyReactProject);
// AppRegistry.registerComponent('MyReactProject', () => FixedDimensionsBasics);
// AppRegistry.registerComponent('MyReactProject', () => PizzaTranslator);
// AppRegistry.registerComponent('MyReactProject', () => ListViewBasics);
// AppRegistry.registerComponent('MyReactProject', () => YoDawgApp)
// AppRegistry.registerComponent('MyReactProject', () => SimpleNavigationApp);
// import PanResponderExample  from './PanDemo'
// AppRegistry.registerComponent('MyReactProject', () => PanResponderExample);
import CrossPlatform  from './switch/CrossPlatform'
AppRegistry.registerComponent('MyReactProject', () => CrossPlatform);