import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

interface ErrorModalProps {
  errorMessage: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errorMessage }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
          <Modal.Title>{errorMessage}</Modal.Title>
        </Modal.Header>
      </Modal>
    </>
  );
}

export default ErrorModal;
