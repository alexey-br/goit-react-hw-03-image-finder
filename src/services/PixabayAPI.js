import axios from 'axios';

const KEY = '29248812-56480c4f477581b48a8b2d913';

axios.defaults.baseURL = 'https://pixabay.com';

const fetchImages = async (query, page) => {
  const params = {
    q: query,
    page: page,
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  };

  const response = await axios.get('/api/', { params });
  return response.data;
};

export default fetchImages;
