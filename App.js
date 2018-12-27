import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PreLoader from './components/PreLoader'
import firebaseConfig from './utils/firebase';
import * as firebase from 'firebase';
firebase.initializeApp(firebaseConfig);
import GuestNavigation from './navigation/guest'


export default class App extends React.Component {
  render() {
    return (
      <GuestNavigation></GuestNavigation>
    );
  }
}


