import React from 'react';
import { StyleSheet, View } from 'react-native';

const ButtonContainer = (props) => {
  return (
    <View style={styles.container}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
});

export { ButtonContainer };
