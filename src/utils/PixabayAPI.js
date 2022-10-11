import axios from 'axios';

export default class PixabayAPI {
  static BASE_URL = 'https://pixabay.com/api/';
  static KEY = '29248812-56480c4f477581b48a8b2d913';

  constructor() {
    this.searchQuery = 'cat';
    this.page = 1;
  }

  async fetchImages() {
    const params = {
      q: this.searchQuery,
      page: 1,
      key: PixabayAPI.KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    };

    const response = await axios.get(PixabayAPI.BASE_URL, { params });
    return response;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
