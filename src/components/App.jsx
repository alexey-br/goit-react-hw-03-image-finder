import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import * as API from '../services/PixabayAPI';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolced',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    page: 1,
    imageQuery: '',
    imagesData: [],
    imagesNumber: null,
    status: Status.IDLE,
  };

  componentDidMount() {
    const { imageQuery, page } = this.state;

    this.setState({ status: Status.PENDING });
    this.getImages(imageQuery, page);
  }

  componentDidUpdate(_, prevState) {
    const { page: prevPage, imageQuery: prevImageQuery } = prevState;
    const { page: newPage, imageQuery: newImageQuery } = this.state;

    if (prevPage === newPage && prevImageQuery === newImageQuery) return;
    console.log('update');

    this.setState({ status: Status.PENDING });
    this.getImages(newImageQuery, newPage);
  }

  getImages = async (imageQuery, page) => {
    try {
      const { hits, totalHits } = await API.fetchImages(imageQuery, page);
      this.setState(prevState => ({
        imagesData: [...prevState.imagesData, ...hits],
        imagesNumber: totalHits,
        status: Status.RESOLVED,
      }));
    } catch (error) {
      console.log('error catched - ', error);
      this.setState({ status: Status.REJECTED });
    }
  };

  handleSearch = text => {
    this.setState({
      imageQuery: text,
      page: 1,
    });
  };

  handleNextPage = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
  };

  areThereMorePages = () => {
    const imagesToShow = this.state.imagesNumber - this.state.page * 12;
    return imagesToShow > 0;
  };

  render() {
    const { imagesData, status } = this.state;
    return (
      <>
        <Searchbar onSearch={this.handleSearch} />
        <main>
          <ImageGallery imagesData={imagesData} />
          {status === Status.RESOLVED && this.areThereMorePages() && (
            <Button onClick={this.handleNextPage}>Load more</Button>
          )}
          {status === Status.PENDING && <Loader />}
        </main>
      </>
    );
  }
}
