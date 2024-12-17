import axios from 'axios';

const API_KEY = 'de3a61eefbdc5a57f95e98812b929488';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query) => {
  const endpoint = query
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`
    : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`;
  const response = await axios.get(endpoint);
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const endpoint = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`;
  const response = await axios.get(endpoint);
  return response.data;
};

export const fetchMovieReviews = async (movieId) => {
  const endpoint = `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=pt-BR`;
  const response = await axios.get(endpoint);

  return response.data.results.map(review => ({
    ...review,
    rating: review.author_details?.rating || 0,
  }));
};

export const fetchBestOfDecade = async () => {
  const endpoint = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=vote_average.desc&vote_count.gte=1000&primary_release_date.gte=2010-01-01&primary_release_date.lte=2019-12-31`;
  const response = await axios.get(endpoint);
  return response.data;
};

export const fetchBestOfYear = async () => {
  const year = new Date().getFullYear();
  const endpoint = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=vote_average.desc&vote_count.gte=1000&primary_release_year=${year}`;
  const response = await axios.get(endpoint);
  return response.data;
};

export const fetchOscarNominations = async () => {
  const endpoint = `${BASE_URL}/list/28?api_key=${API_KEY}&language=pt-BR`;
  const response = await axios.get(endpoint);
  return response.data;
};

