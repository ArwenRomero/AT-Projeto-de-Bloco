import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const RateMovie = ({ visible, onClose, movie, onSave }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [liked, setLiked] = useState(false);

  const handleSave = () => {
    const userReview = {
      id: Date.now(),
      author: 'Você',
      content: review,
      rating,
      liked,
      date: new Date().toLocaleDateString(),
    };
    onSave(userReview);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>Cancelar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Eu assisti...</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Salvar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.movieInfo}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
            style={styles.movieImage}
          />
          <View>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.movieYear}>{new Date(movie.release_date).getFullYear()}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={28}
                color="#FFD700"
              />
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={28}
              color={liked ? '#e91e63' : '#666'}
              style={styles.likeIcon}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Escreva sua avaliação aqui..."
          multiline
          value={review}
          onChangeText={setReview}
        />
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelButton: {
    color: '#e91e63',
    fontSize: 16,
  },
  saveButton: {
    color: '#4caf50',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  movieImage: {
    width: 50,
    height: 75,
    borderRadius: 5,
    marginRight: 10,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  movieYear: {
    fontSize: 14,
    color: '#666',
  },
  dateText: {
    fontSize: 14,
    marginBottom: 20,
    color: '#888',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  likeIcon: {
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
});
