const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'b799de2e1359641dffd47460cedfbdc0';

import axios from 'axios';

export default class MoviesApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async getPopularMovies() {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.page}`,
      );
      this.incrementPage();
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
}
