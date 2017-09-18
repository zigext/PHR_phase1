/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Router, Scene } from 'react-native-router-flux'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import CreateLogger from 'redux-logger'
import Login from './app/containers/Login'
import Home from './app/containers/Home'
import reducer from './app/reducers/Index'
import App from './app/containers/App'

// export default class HPHRp1 extends Component {
//   render() {

//     const store = createStore(reducer)
//     console.log("store state ",store.getState())
//     return (
//       <Provider store={store}>
//         <Router>
//           <Scene key='root' navigationBarStyle={{ backgroundColor: '#474045' }} titleStyle={{ color: 'white' }} barButtonTextStyle={{ color: 'white' }}>
//             <Scene key='loginPage' component={Login} title='Log in'  />
//             <Scene key='homePage' component={Home} title='Home' initial={true}/>
//           </Scene>
//         </Router>
//       </Provider>
//     );
//   }
// }
// class App extends React.Component {
//     render() {
//       const store = createStore(reducer)
//       console.log("store state ",store.getState())
//         return (
//             <Provider store={store}>
//                 {() => <HPHRp1 />}
//             </Provider>
//         );
//     }
// }


AppRegistry.registerComponent('HPHRp1', () => App);
