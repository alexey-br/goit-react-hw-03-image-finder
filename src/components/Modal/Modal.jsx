import { Component } from 'react';
import { ModalWrapper, Overlay } from './Modal.styled';

export default class Modal extends Component {
  render() {
    return (
      <Overlay>
        <ModalWrapper>{this.props.children}</ModalWrapper>
      </Overlay>
    );
  }
}

// export default Modal;
