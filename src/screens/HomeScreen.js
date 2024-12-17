import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, ScrollView, TouchableOpacity, Image, Button } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { MovieCard } from '../components/MovieCard';
import { fetchMovies, fetchBestOfDecade, fetchBestOfYear, fetchOscarNominations } from '../api/tmdb';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useAuth } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../styles/HomeStyles';

export const HomeScreen = ({ navigation }) => {
  const [term, setTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [bestOfDecade, setBestOfDecade] = useState([]);
  const [bestOfYear, setBestOfYear] = useState([]);
  const [oscarNominations, setOscarNominations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { signOut } = useAuth();

  useEffect(() => {
    loadFavorites();
    loadWatchlist();
    loadMovies();
    loadBestOfDecade();
    loadBestOfYear();
    loadOscarNominations();
  }, []);

  const loadFavorites = async () => {
    const storedFavorites = await AsyncStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  };

  const loadWatchlist = async () => {
    const storedWatchlist = await AsyncStorage.getItem('watchlist');
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
  };

  const toggleFavorite = async (movie) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);
    const updatedFavorites = isAlreadyFavorite
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const toggleWatchlist = async (movie) => {
    const isInWatchlist = watchlist.some((item) => item.id === movie.id);
    const updatedWatchlist = isInWatchlist
      ? watchlist.filter((item) => item.id !== movie.id)
      : [...watchlist, movie];

    setWatchlist(updatedWatchlist);
    await AsyncStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  const loadMovies = async (query = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchMovies(query);
      if (!data.results.length) {
        setError('Nenhum resultado encontrado.');
        setMovies([]);
      } else {
        setMovies(data.results);
      }
    } catch (err) {
      setError('Erro ao carregar os filmes. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadBestOfDecade = async () => {
    try {
      const data = await fetchBestOfDecade();
      setBestOfDecade(data.results);
    } catch (err) {
      console.error('Erro ao carregar os melhores filmes da década:', err);
    }
  };

  const loadBestOfYear = async () => {
    try {
      const data = await fetchBestOfYear();
      setBestOfYear(data.results);
    } catch (err) {
      console.error('Erro ao carregar os melhores filmes do ano:', err);
    }
  };

  const loadOscarNominations = async () => {
    try {
      const data = await fetchOscarNominations();
      setOscarNominations(data.items);
    } catch (err) {
      console.error('Erro ao carregar os indicados ao Oscar:', err);
    }
  };

  return (<LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.container}> <Animatable.View animation="fadeInDown" duration={800} style={styles.header}>
    <View style={styles.headerContent}>
  <Text style={styles.title}>VouAvaliar</Text>
  <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
    <Icon name="logout" size={24} color="#fff" />
  </TouchableOpacity>
</View>

    <SearchBar term={term} onTermChange={setTerm} onTermSubmit={() => loadMovies(term)} isLoading={isLoading} /> </Animatable.View> <Animatable.View animation="fadeInUp" duration={1000} style={styles.content}> {isLoading ? (<View style={styles.loadingContainer}> <ActivityIndicator size="large" color="#fff" /> </View>) : error ? (<Text style={styles.error}>{error}</Text>) : (<ScrollView>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Em Destaque</Text>
        <FlatList
          data={movies}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { movie: item })}>
              <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.featuredImage} />
              <Text style={styles.featuredTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categorias</Text>
        <ScrollView horizontal contentContainerStyle={styles.horizontalList}>
          <TouchableOpacity style={styles.categoryButton}><Text style={styles.categoryButtonText}>Discover</Text></TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}><Text style={styles.categoryButtonText}>Ação</Text></TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}><Text style={styles.categoryButtonText}>Drama</Text></TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}><Text style={styles.categoryButtonText}>Comédia</Text></TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Minha Lista</Text>
        <FlatList
          data={watchlist}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              isInWatchlist={watchlist.some((mov) => mov.id === item.id)}
              onWatchlistToggle={() => toggleWatchlist(item)}
            />
          )}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Populares no TMDb</Text>
        <FlatList
          data={movies}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              isFavorite={favorites.some((fav) => fav.id === item.id)}
              onFavoriteToggle={() => toggleFavorite(item)}
              isInWatchlist={watchlist.some((mov) => mov.id === item.id)}
              onWatchlistToggle={() => toggleWatchlist(item)}
            />
          )}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Melhores da Década</Text>
        <FlatList
          data={bestOfDecade}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              isFavorite={favorites.some((fav) => fav.id === item.id)}
              onFavoriteToggle={() => toggleFavorite(item)}
              isInWatchlist={watchlist.some((mov) => mov.id === item.id)}
              onWatchlistToggle={() => toggleWatchlist(item)}
            />
          )}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Melhores do Ano</Text>
        <FlatList
          data={bestOfYear}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              isFavorite={favorites.some((fav) => fav.id === item.id)}
              onFavoriteToggle={() => toggleFavorite(item)}
              isInWatchlist={watchlist.some((mov) => mov.id === item.id)}
              onWatchlistToggle={() => toggleWatchlist(item)}
            />
          )}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Indicados ao Oscar</Text>
        <FlatList
          data={oscarNominations}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              isFavorite={favorites.some((fav) => fav.id === item.id)}
              onFavoriteToggle={() => toggleFavorite(item)}
              isInWatchlist={watchlist.some((mov) => mov.id === item.id)}
              onWatchlistToggle={() => toggleWatchlist(item)}
            />
          )}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
    </ScrollView>
    )}
    </Animatable.View>
  </LinearGradient>
  );
};