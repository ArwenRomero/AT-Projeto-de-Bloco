import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Rates = ({ userReview, reviews }) => {
  const [visibleReviews, setVisibleReviews] = useState(5);

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating / 2);
    return Array.from({ length: totalStars }, (_, index) => (
      <Ionicons
        key={index}
        name={index < filledStars ? 'star' : 'star-outline'}
        size={16}
        color="#FFD700"
      />
    ));
  };

  const renderReview = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Ionicons name="person-circle" size={40} color="#45b1f5" />
        <Text style={styles.reviewAuthor}>{item.author || 'Você'}</Text>
      </View>
      <Text style={styles.reviewContent}>{item.content}</Text>
      <View style={styles.ratingContainer}>{renderStars(item.rating || 0)}</View>
    </View>
  );

  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 5);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Avaliações</Text>
      <FlatList
        data={[userReview, ...reviews].filter(Boolean).slice(0, visibleReviews)}
        renderItem={renderReview}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
      {visibleReviews < reviews.length && (
        <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
          <Text style={styles.loadMoreText}>Ver mais</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    paddingBottom: 20,
    flexShrink: 0,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10,
    color: '#444',
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 10,
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    marginVertical: 5,
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewAuthor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  reviewContent: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadMoreButton: {
    backgroundColor: '#45b1f5',
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
