import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export const SearchBar = ({ term, onTermChange, onTermSubmit, isLoading }) => {
  return (
    <Animatable.View animation="fadeInDown" duration={800} style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar filmes..."
        placeholderTextColor="#aaa"
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
        returnKeyType="search"
        onSubmitEditing={onTermSubmit}
      />
      <TouchableOpacity style={styles.searchButton} onPress={onTermSubmit}>
        <Ionicons name="search" size={24} color="#fff" />
      </TouchableOpacity>
      {isLoading && <ActivityIndicator size="small" color="#666" style={styles.loader} />}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 5,
    outlineStyle: 'none',
  },
  searchButton: {
    backgroundColor: '#e91e',
    borderRadius: 20,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  loader: {
    marginLeft: 10,
  },
});
