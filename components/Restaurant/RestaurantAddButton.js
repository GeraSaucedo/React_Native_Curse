import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import AppButton from '../AppButton';

export default class RestaurantAddButton extends Component {
  render() {
    console.log('restaurant add button FILESSSSSS');
    const {addRestaurant} = this.props;
    
    return (
      <View style={styles.buttonContainer}>
        <AppButton
            bgColor="rgba(255, 38, 74, 0.6)"
            title="Añadir Restaurante"
            action={addRestaurant}
            iconName="plus"
            iconSize={30}
            iconColor="#fff"
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 0,
    }
});