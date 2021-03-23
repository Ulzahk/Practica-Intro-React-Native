import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import Colors from '../../resources/colors';

const CoinstItem = ({ item, onPress }) => {
  const getImageArrow = () => {
    if (item.percent_change_1h > 0){
      return require('cryptoTracker/src/assets/up-128.png');
    } else {
      return require('cryptoTracker/src/assets/down-128.png');
    }
  };
  const getSymbolIcon = (nameStr) => {
    if (nameStr) {
      const symbol = nameStr.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Image
          style={styles.iconImg}
          source={{ uri: getSymbolIcon(item.nameid) }}
        />
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image style={styles.imgIcon} source={getImageArrow()} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1,
    paddingLeft: Platform.OS === 'ios' ? 0 : 16,
  },
  row: {
    flexDirection: 'row',
  },
  iconImg: {
    alignSelf: 'center',
    width: 25,
    height: 25,
    marginRight: 8,
  },
  symbolText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: 14,
    marginRight: 12,
  },
  percentText: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: 12,
  },
  priceText: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: 14,
  },
  imgIcon: {
    alignSelf: 'center',
    width: 22,
    height: 22,
    marginLeft: 8,
  },
});

export default CoinstItem;
