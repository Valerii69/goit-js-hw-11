import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class ApiPhotoService {
  constructor() {
    this.URL = 'https://pixabay.com/api/';
    this.KEY = '35758762-7b56d36fcc9a29f605f00bc33';
    this.PAGE = 1;
    this.PER_PAGE = 20;
    this.searchQuery = '';
  }
  //публічний API сервісу Pixabay синтаксис async
  async fetchPhoto() {
    const searchParams = new URLSearchParams({
      key: this.KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: this.PER_PAGE,
      page: this.PAGE,
    });

    const newParams = searchParams.toString();
    try {
      const response = await axios.get(`${this.URL}?${newParams}`);
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      this.PAGE += 1;
      return response.data;
    } 
    catch (error) {
      Notify.failure(error.message);
    }
  }
  get page() {
    return this.PAGE;
  }
  set page(newPage) {
    this.PAGE = newPage;
  }
  resetPage() {
    this.PAGE = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

console.log(URLSearchParams);
// console.log(fetchPhoto());
