import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { fetchMovieDetails, fetchMovieReviews } from '../api/tmdb';
import { RateMovie } from '../components/RateMovie';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Rates } from '../components/Rates';

const { width } = Dimensions.get('window');

export const MovieDetailsScreen = ({ route }) => {
  const { movie } = route.params;
  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadMovieDetails();
    loadReviews();
  }, []);

  const loadMovieDetails = async () => {
    const data = await fetchMovieDetails(movie.id);
    setDetails(data);
  };

  const loadReviews = async () => {
    const apiReviews = await fetchMovieReviews(movie.id);
    setReviews(apiReviews || []);
  };

  const handleSaveReview = (review) => {
    setUserReview(review);
    setModalVisible(false);
  };

  const renderCastItem = ({ item }) => (
    <View style={styles.castItem}>
      <Image
        source={{
          uri: item.profile_path
            ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
            : 'https://via.placeholder.com/100x150.png?text=No+Image',
        }}
        style={styles.castImage}
      />
      <Text style={styles.castName} numberOfLines={1}>
        {item.name}
      </Text>
    </View>
  );

  if (!details) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e91e63" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <Animatable.View animation="fadeInUp" duration={800} style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }}
          style={styles.poster}
        />
        <Text style={styles.title}>{details.title}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color="#e91e63" />
        </TouchableOpacity>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={24} color="#FFD700" />
          <Text style={styles.ratingText}>{details.vote_average.toFixed(1)} / 10</Text>
        </View>
        <Text style={styles.subtitle}>Sinopse</Text>
        <Text style={styles.overview}>{details.overview || 'Sinopse não disponível.'}</Text>
        <Text style={styles.subtitle}>Elenco Principal</Text>
        <FlatList
          data={details.credits.cast}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCastItem}
          contentContainerStyle={styles.castList}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <Rates userReview={userReview} reviews={reviews} />
      </ScrollView>
      <RateMovie
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        movie={details}
        onSave={handleSaveReview}
      />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  poster: {
    width: '100%',
    height: width * 1.5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
  editButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 18,
    color: '#555',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
    color: '#444',
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: 20,
    marginVertical: 10,
    color: '#666',
  },
  castList: {
    paddingHorizontal: 10,
    flexGrow: 0,
  },
  castItem: {
    marginHorizontal: 5,
    alignItems: 'center',
    maxWidth: 80,
    height: 140,
  },
  castImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginBottom: 5,
    resizeMode: 'cover',
  },
  castName: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});