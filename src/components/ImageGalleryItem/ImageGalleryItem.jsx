import { Component } from 'react';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';
import Modal from '../Modal/Modal';

// const ImageGalleryItem = ({ previewURL, imageURL, tags }) => {

// };

export default class ImageGalleryItem extends Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { previewURL, imageURL, tags } = this.props;
    return (
      <>
        <GalleryItem onClick={this.toggleModal}>
          <GalleryImage src={previewURL} alt={tags} />
        </GalleryItem>
        {this.state.showModal && (
          <Modal closeModal={this.toggleModal}>
            <img
              src={imageURL}
              alt={tags}
              style={{ position: 'reletive', maxHeight: 'inherit' }}
            />
          </Modal>
        )}
      </>
    );
  }
}
