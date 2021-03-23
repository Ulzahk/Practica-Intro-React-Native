import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  Pressable,
  Alert,
  SectionList,
  FlatList,
  StyleSheet,
} from 'react-native';
import Http from '../../lib/https';
import Colors from '../../resources/colors';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../../lib/storage';

const CoinDetailsScreen = ({ route, navigation }) => {
  const [markets, setMarkets] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { coin } = route.params;

  navigation.setOptions({ title: coin.symbol });

  useEffect(() => {
    getMarkets(coin.id);
    getFavorite();
  }, [coin.id, getFavorite]);

  const getSymbolIcon = (nameStr) => {
    if (nameStr) {
      const symbol = nameStr.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  const getSetions = () => {
    const sections = [
      {
        title: 'Market Cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];

    return sections;
  };

  const getMarkets = async (coinId) => {
    const url = 'https://api.coinlore.net/api/coin/markets/?id=90';

    const marketsData = await Http.instance.get(url);

    setMarkets(marketsData);
  };

  const toogleFavorite = () => {
    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  const addFavorite = async () => {
    const favoriteCoin = JSON.stringify(coin);
    const key = `favorite-${coin.id}`;

    const stored = await Storage.instance.store(key, favoriteCoin);

    if (stored) {
      setIsFavorite(true);
    }
  };

  const removeFavorite = async () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${coin.id}`;

          await Storage.instance.remove(key);

          setIsFavorite(false);
        },
        style: 'destructive',
      },
    ]);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFavorite = async () => {
    try {
      const key = `favorite-${coin.id}`;
      const favStr = await Storage.instance.get(key);
      if (favStr !== null) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.log('GetFavorite error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            style={styles.iconImg}
            source={{ uri: getSymbolIcon(coin.nameid) }}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        <Pressable
          onPress={toogleFavorite}
          style={isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd}>
          <Text style={styles.btnFavoriteText}>
            {isFavorite ? 'Remove favorite' : 'Add Favorite'}
          </Text>
        </Pressable>
      </View>

      <SectionList
        style={styles.section}
        sections={getSetions()}
        keyExtractor={(item) => item}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.itemTextHeader}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
      />
      <Text style={styles.marketTitle}>Markets</Text>
      <FlatList
        style={styles.marketList}
        horizontal={true}
        keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
        data={markets}
        renderItem={({ item }) => <CoinMarketItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  marketTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 8,
  },
  marketList: {
    maxHeight: 100,
    paddingLeft: 8,
    marginRight: 8,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemTextHeader: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
  btnFavoriteAdd: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.carmine,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
  row: {
    flexDirection: 'row',
  },
});

export default CoinDetailsScreen;
