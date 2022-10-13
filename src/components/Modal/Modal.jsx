import { createPortal } from 'react-dom';
import { Component } from 'react';
import { ModalWrapper, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClose);
    console.log('add');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClose);
    console.log('remove');
  }

  handleClose = e => {
    if (e.code === 'Escape') this.props.closeModal();
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) this.props.closeModal();
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <ModalWrapper>{this.props.children}</ModalWrapper>
      </Overlay>,
      modalRoot
    );
  }
}