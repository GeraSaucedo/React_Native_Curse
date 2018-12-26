import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from './components/AppButton'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
       <AppButton
        bgColor = "blue"
        title ="Boton"
        action={() => console.log(1)}
        iconName="sign-in"
        iconSize={30}
        iconColor="#fff"
       >

       </AppButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
