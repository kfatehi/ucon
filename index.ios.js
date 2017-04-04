/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// some links, organized based on whether im using them or should look into using them: MAYBE, USING
// MAYBE ios status bar height... https://github.com/jgkim/react-native-status-bar-size
// USING grid list https://github.com/yelled3/react-native-grid-example

import React, { Component } from 'react';
import {
  AppState,
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View,
  Navigator,
  StatusBar,
  RefreshControl,
  TouchableHighlight
} from 'react-native';

import request from './src/request';

export default class ucon extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.label !== r2.label
    });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      currentThing: null,
      refreshing: false,
    };
    this._onRefresh();
  }

  _onRefresh() {
    this.setState({refreshing: true});
    request('/things').then(things => {
      console.log(things);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(things.map(t=>t.label)),
        refreshing: false
      })
    })
  }

  render() {
    const routes = [
      {
        title: 'thingsIndex',
        index: 0,
        render: (route, navigator) => <ListView
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
            <TouchableHighlight onPress={() => {
              this.setState({ currentThing: rowData })
              navigator.push(routes[1]);
            }}>
            <Text style={styles.item}>{rowData}</Text>
          </TouchableHighlight>
          }
        >
          <StatusBar
            backgroundColor="blue"
            barStyle="light-content"
            hidden={route.statusBarHidden}
          />
        </ListView>
      },{
        title: 'thingInterface',
        index: 1,
        render: (route, navigator) => <View>
          <Text> you are here </Text>
          <TouchableHighlight onPress={() => navigator.pop() }>
            <Text style={styles.item}>{this.state.currentThing}</Text>
          </TouchableHighlight>
        </View>
      }
    ];
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) => route.render(route, navigator)}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.VerticalUpSwipeJump}

        style={styles.nav}
      />
    );
  }
}

const styles = StyleSheet.create({
  nav: {
    padding: 20
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    backgroundColor: '#CCC',
    margin: 10,
    width: 100,
    height: 100
  }
});

AppRegistry.registerComponent('ucon', () => ucon);
