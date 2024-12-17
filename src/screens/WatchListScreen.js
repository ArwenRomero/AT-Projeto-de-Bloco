import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MovieCard } from '../components/MovieCard';

export const WatchlistScreen = ({ navigation }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    loadWatchlist();
    const unsubscribe = navigation.addListener('focus', loadWatchlist);
    return unsubscribe;
  }, [navigation]);

  const loadWatchlist = async () => {
    const storedWatchlist = await AsyncStorage.getItem('watchlist');
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
  };

  const removeFromWatchlist = async (movie) => {
    const updatedWatchlist = watchlist.filter((item) => item.id !== movie.id);
    setWatchlist(updatedWatchlist);
    await AsyncStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filmes para Ver</Text>
      <FlatList
        data={watchlist}
        keyExtractor={(item) => (item && item.id ? item.id.toString() : Math.random().toString())}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            isInWatchlist
            onWatchlistToggle={() => removeFromWatchlist(item)}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f2027',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e0e0e0',
    textAlign: 'center',
    marginVertical: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  list: {
    paddingBottom: 20,
  },
  movieCard: {
    backgroundColor: '#1f3a45',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  movieDetails: {
    fontSize: 14,
    color: '#d3d3d3',
  },
});
