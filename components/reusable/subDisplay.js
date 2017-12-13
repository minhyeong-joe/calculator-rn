import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SubDisplay = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.history}>{props.subDisplay}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  history: {
    color: 'lightgray',
    alignSelf: 'flex-end',
    padding: 8,
  }
});

export default SubDisplay;
