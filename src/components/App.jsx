import { Component } from 'react';
import PixabayAPI from 'utils/PixabayAPI';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from './Button/Button';

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
    // const data = pixabayApi.fetchImages();
    console.log(text);
  };

  render() {
    return (
      <>
        <Searchbar onSearch={this.handleSearch} />
        <main>
          <ImageGallery>
            <li>hello</li>
            <li>world</li>
          </ImageGallery>
          <Button>Load more</Button>
        </main>
      </>
    );
  }
}
