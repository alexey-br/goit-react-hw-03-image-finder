import { Component } from 'react';
// import PixabayAPI from 'utils/PixabayAPI';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolced',
//   REJECTED: 'rejected',
// };

// const pixabayApi = new PixabayAPI();

export default class App extends Component {
  state = {
    images: [],
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleSearch = text => {
    // pixabayApi.query = text;
    // const data = pixabayApi.fetchImages();
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
          <Button onClick={this.toggleModal}>Load more</Button>
          {this.state.showModal && (
            <Modal closeModal={this.toggleModal}>
              <h2>Modal</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Tenetur a asperiores temporibus nesciunt molestiae magni
                dignissimos, consectetur expedita nisi, laudantium, fugit velit.
                Velit libero reiciendis sunt quibusdam repellat excepturi
                accusantium!
              </p>
            </Modal>
          )}
        </main>
      </>
    );
  }
}
