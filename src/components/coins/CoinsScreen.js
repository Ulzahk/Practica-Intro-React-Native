import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Http from '../../lib/https';
import CoinsItem from './CoinsItem';
import Colors from '../../resources/colors';
import CoinsSeacher from './CoinsSeacher';

const CoinsScreen = ({ navigation }) => {
  const [coins, setCoins] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);

      const res = await Http.instance.get(
        'https://api.coinlore.net/api/tickers/',
      );
      setCoins(res.data);
      setAllCoins(res.data);
      setLoading(false);
    };

    fetchCoins();
  }, []);

  const handlePress = (coin) => {
    // console.log('Go to details');
    navigation.navigate('CoinDetails', { coin });
  };

  const handleSearch = (query) => {
    try {
      query === undefined ? '' : query;
      const coinsFiltered = allCoins.filter((coin) => {
        return (
          coin.name.toLowerCase().includes(query.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(query.toLowerCase())
        );
      });
      setCoins(coinsFiltered);
    } catch (error) {
      console.log('handleSearch error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <CoinsSeacher onChange={(text) => handleSearch(text)} />
      {loading ? (
        <ActivityIndicator style={styles.loader} color="#FFF" size="large" />
      ) : null}
      <FlatList
        data={coins}
        renderItem={({ item }) => (
          <CoinsItem item={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  textTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;
