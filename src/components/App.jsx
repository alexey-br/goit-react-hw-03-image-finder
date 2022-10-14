import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

import * as API from '../services/PixabayAPI';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolced',
//   REJECTED: 'rejected',
// };

export default class App extends Component {
  state = {
    page: 1,
    imageQuery: '',
    imagesData: [],
  };

  componentDidMount() {
    const { imageQuery, page } = this.state;

    this.getImages(imageQuery, page);
  }

  componentDidUpdate(_, prevState) {
    const { page: prevPage, imageQuery: prevImageQuery } = prevState;
    const { page: newPage, imageQuery: newImageQuery } = this.state;

    if (prevPage === newPage && prevImageQuery === newImageQuery) return;

    this.getImages(newImageQuery, newPage);
  }

  getImages = async (imageQuery, page) => {
    try {
      const data = await API.fetchImages(imageQuery, page);
      this.setState({ imagesData: data.hits });
    } catch (error) {
      console.log('error catched - ', error);
    }
  };

  handleSearch = text => {
    this.setState({ imageQuery: text, page: 1, imagesData: [] });
  };

  handleNextPage = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  render() {
    return (
      <>
        <Searchbar onSearch={this.handleSearch} />
        <main>
          <ImageGallery imagesData={this.state.imagesData} />
          <Button onClick={this.handleNextPage}>Load more</Button>
        </main>
      </>
    );
  }
}
