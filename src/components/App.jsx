import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import scrollToNewImages from 'services/scroll-to-new-images';
import fetchImages from 'services/PixabayAPI';
import NoImageAlert from './NoImageAlert/NoImageAlert';
import { IMAGES_PER_PAGE } from 'services/PixabayAPI';

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
    pageHight: null,
    status: Status.IDLE,
  };

  componentDidMount() {
    const { imageQuery, page } = this.state;

    this.setState({ status: Status.PENDING });
    this.getImages(imageQuery, page);
  }

  componentDidUpdate(_, prevState) {
    const {
      page: prevPage,
      imageQuery: prevImageQuery,
      pageHight: prevPageHight,
    } = prevState;
    const {
      page: newPage,
      imageQuery: newImageQuery,
      pageHight: newPageHight,
    } = this.state;

    if (prevPage === newPage && prevImageQuery === newImageQuery) return;

    this.setState({ status: Status.PENDING });
    this.getImages(newImageQuery, newPage);

    if (newPageHight !== prevPageHight) {
      setTimeout(() => scrollToNewImages(this.state.pageHight), 500);
    }
  }

  getImages = async (imageQuery, page) => {
    try {
      const { hits, totalHits } = await fetchImages(imageQuery, page);
      if (totalHits === 0) {
        this.setState({ status: Status.REJECTED });
        return;
      }
      this.setState(({ imagesData }) => ({
        imagesData: [...imagesData, ...hits],
        imagesNumber: totalHits,
        status: Status.RESOLVED,
      }));
    } catch (error) {
      console.log('error catched: ', error);
      this.setState({ status: Status.REJECTED });
    }
  };

  handleSearch = text => {
    this.setState(({ imageQuery }) => {
      if (imageQuery !== text) {
        return {
          imageQuery: text,
          imagesData: [],
          page: 1,
        };
      }
    });
  };

  handleNextPage = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      pageHight: document.body.scrollHeight,
    }));
  };

  checkForNextPage = () => {
    const { imagesNumber, page } = this.state;

    const maxShownImages = page * IMAGES_PER_PAGE;
    return imagesNumber > maxShownImages;
  };

  render() {
    const { imagesData, status } = this.state;

    return (
      <>
        <Searchbar onSearch={this.handleSearch} />
        <main>
          <ImageGallery imagesData={imagesData} />
          {status === Status.RESOLVED && this.checkForNextPage() && (
            <Button onClick={this.handleNextPage}>Load more</Button>
          )}
          {status === Status.PENDING && <Loader />}
          {status === Status.REJECTED && <NoImageAlert />}
        </main>
      </>
    );
  }
}
