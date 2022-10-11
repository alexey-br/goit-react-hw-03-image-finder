import { Component } from 'react';
import PixabayAPI from 'utils/PixabayAPI';
import Searchbar from './Searchbar';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolced',
//   REJECTED: 'rejected',
// };

const pixabayApi = new PixabayAPI();

export default class App extends Component {
  state = {
    images: [],
  };

  handleSearch = text => {
    // pixabayApi.query = text;
    const data = pixabayApi.fetchImages();
    console.log(data);
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
      </div>
    );
  }
}
