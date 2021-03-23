import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import CoinsItem from '../coins/CoinsItem';
import Colors from '../../resources/colors';
import Storage from '../../lib/storage';
const FavoritesScreen = ({ navigation }) => {
  const [favoritesState, setFavoritesState] = useState([]);
  const getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();

      const keys = allKeys.filter((key) => key.includes('favorite-'));

      const favs = await Storage.instance.multiGet(keys);

      const favorites = favs.map((fav) => JSON.parse(fav[1]));

      setFavoritesState(favorites);
    } catch (error) {
      console.log('GetFavorites error: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  const handlePress = (coin) => {
    navigation.navigate('CoinDetails', { coin });
  };

  return (
    <View style={styles.container}>
      {favoritesState.length === 0 ? <FavoritesEmptyState /> : null}
      {favoritesState.length > 0 ? (
        <FlatList
          data={favoritesState}
          renderItem={({ item }) => (
            <CoinsItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
});

export default FavoritesScreen;
