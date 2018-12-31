import React from 'react';
import PreLoader from './components/PreLoader';
import firebaseConfig from './utils/firebase';
import * as firebase from 'firebase';
firebase.initializeApp(firebaseConfig);
import { StyleSheet, Text, View } from 'react-native';
import GuestNavigation from './navigation/guest'


export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      isLogged: false,
      loaded: false
    }
  }

  async componentDidMount () {
    await firebase.auth().onAuthStateChanged((user) => {
        if(user !== null ) {
          this.setState({
            isLogged: true,
            loaded: true
          });
        } else{
          this.setState({
            isLogged: false,
            loaded: true
          });
        }
    })
  }
  render() {
    const {isLogged, loaded} = this.state;

    if( ! loaded) {
      return (<PreLoader/>);
    }

    if (isLogged) {
      return (<Text>Logueado</Text>)
    } else {
      return (<GuestNavigation/>)
    }
  }
}


