import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import SubDisplay from './subDisplay';

const Display = (props) => {
  return(
    <View style={styles.container}>
      <SubDisplay subDisplay={props.subDisplay} />
      <View style={styles.displayBox}>
        <ScrollView
          contentContainerStyle={styles.display}
          horizontal
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{
            this.scrollView.scrollToEnd({animated: true});
          }}
        >
          {/* <View style={styles.displayBox}> */}
            <Text style={styles.text}>{props.display}</Text>
          {/* </View> */}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  display: {
    justifyContent: 'flex-end',
  },
  displayBox: {
    flex: 1,
    alignSelf: 'flex-end',
  },
  text: {
    color: 'white',
    alignSelf: 'flex-end',
    fontSize: 40,
    padding: 4,
  },
});

export { Display };
