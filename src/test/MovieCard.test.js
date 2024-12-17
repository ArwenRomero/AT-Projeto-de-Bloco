import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MovieCard } from '../components/MovieCard';
import { NavigationContainer } from '@react-navigation/native';

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
}));

describe('MovieCard Component', () => {
  const movie = {
    title: 'Example Movie',
    poster_path: '/example.jpg',
  };

  it('renders the movie title and image correctly', () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <MovieCard movie={movie} />
      </NavigationContainer>
    );

    expect(getByText('Example Movie')).toBeTruthy();
    expect(getByTestId('movie-image').props.source.uri).toBe(
      'https://image.tmdb.org/t/p/w500/example.jpg'
    );
  });

  it('calls onFavoriteToggle when favorite button is pressed', () => {
    const onFavoriteToggle = jest.fn();
    const { getByTestId } = render(
      <MovieCard
        movie={movie}
        isFavorite={false}
        onFavoriteToggle={onFavoriteToggle}
      />
    );

    fireEvent.press(getByTestId('favorite-button'));
    expect(onFavoriteToggle).toHaveBeenCalledTimes(1);
  });

  it('calls onWatchlistToggle when watchlist button is pressed', () => {
    const onWatchlistToggle = jest.fn();
    const { getByTestId } = render(
      <MovieCard
        movie={movie}
        isInWatchlist={false}
        onWatchlistToggle={onWatchlistToggle}
      />
    );

    fireEvent.press(getByTestId('watchlist-button'));
    expect(onWatchlistToggle).toHaveBeenCalledTimes(1);
  });

  it('navigates to MovieDetails when the card is pressed', () => {
    const { getByTestId } = render(
      <MovieCard movie={movie} />
    );

    fireEvent.press(getByTestId('movie-card'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('MovieDetails', { movie });
  });
});
