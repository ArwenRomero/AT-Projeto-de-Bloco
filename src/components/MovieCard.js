import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export const MovieCard = ({
  movie,
  isFavorite,
  isInWatchlist,
  onFavoriteToggle,
  onWatchlistToggle,
}) => {
  const navigation = useNavigation();

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/300x500.png?text=No+Image';

  return (
    <Animatable.View animation="fadeInUp" duration={700} style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { movie })}>
        <Image source={{ uri: posterUrl }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <View style={styles.buttonsContainer}>
          {onFavoriteToggle && (
            <TouchableOpacity onPress={onFavoriteToggle} style={styles.favoriteButton}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={28}
                color={isFavorite ? '#e91e63' : '#999'}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onWatchlistToggle} style={styles.watchlistButton}>
            <Ionicons
              name={isInWatchlist ? 'time' : 'time-outline'}
              size={28}
              color={isInWatchlist ? '#e91e63' : '#999'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width / 2 - 30,
    marginHorizontal: 10,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  info: {
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#f1f1f1',
  },
  watchlistButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#f1f1f1',
  },
});
