import React, { useState } from 'react';
import { TextInput, Platform, View, StyleSheet } from 'react-native';
import Colors from '../../resources/colors';

const CoinsSeacher = (props) => {
  const [query, setQuery] = useState();

  const handleText = (queryInput) => {
    queryInput === undefined ? '' : queryInput;
    setQuery(queryInput);

    if (props.onChange) {
      props.onChange(query);
    }
  };

  // eslint-disable-next-line no-return-assign
  return (
    <View>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => handleText(text)}
        placeholder="Search Coin"
        placeholderTextColor="#FFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: Colors.charade,
    paddingLeft: 16,
    borderBottomWidth: 2,
    borderBottomColor: Colors.zircon,
    color: Colors.white,
  },
  // textInputAndroid: {
  //   borderBottomWidth: 2,
  //   borderBottomColor: Colors.zircon,
  // },
  // textInputIOS: {
  //   margin: 8,
  //   borderRadius: 8,
  // },
});

export default CoinsSeacher;
