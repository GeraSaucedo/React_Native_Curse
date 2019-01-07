import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class CommentEmpty extends Component {
  render() {
    return (
      <View style={styles.CommentEmptyView}>
            <Text style={styles.CommentEmptyText}>
                Sé el primero en opinar
            </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    CommentEmptyView: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    CommentEmptyText: {
        backgroundColor: 'rgba(10, 255, 10, 0.8)',
        color: 'white',
        textAlign: 'center',
        padding: 20
    }
});