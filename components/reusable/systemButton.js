import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SystemButton = (props) => {
  return(
    <TouchableOpacity
      style={styles.button}
      onPress={props.action}
    >
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles=StyleSheet.create({
  button: {
    width: 80,
    height: 60,
    backgroundColor: '#d2d0d0',
    borderWidth: 1,
    borderColor: '#dadada',
    justifyContent: 'center'
  },
  text: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: '900',
    paddingTop: 10,
    paddingBottom: 10
  }
});

export { SystemButton };
