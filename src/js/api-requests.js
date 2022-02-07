const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'b799de2e1359641dffd47460cedfbdc0';

import axios from 'axios';
export default class MoviesApi {
  constructor() {
    this.searchQuery = '';
    this.movieId = '';
    this.page = 1;
  }

  async getPopularMovies() {
    try {
      const response = await axios.get(
        `${BASE_URL}trending/movie/day?api_key=${API_KEY}&language=en-US&page=${this.page}`,
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getSearchMovies() {
    try {
      const response = await axios.get(
        `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`,
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getMoviesById() {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/${this.movieId}?api_key=${API_KEY}&language=en-US`,
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getUpcomingMovies() {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getMoviesTrailer() {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/${this.movieId}/videos?api_key=${API_KEY}&language=en-US`,
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get id() {
    //TODO: Maybe here should be this.movieId?
    return this.searchQuery;
  }

  set id(newId) {
    this.movieId = newId;
  }
  set page(newPage) {
    this._page = newPage;
  }
  get page() {
    return this._page;
  }
}
