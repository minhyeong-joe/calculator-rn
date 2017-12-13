import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Section = (props) => {
  return(
    <View style={styles.section}>
      {props.children}
    </View>
  );
};

const styles=StyleSheet.create({
  section: {
    height: 100,
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
});

export { Section };
