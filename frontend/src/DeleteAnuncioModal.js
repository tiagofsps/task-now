import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeleteAnuncioModal({ show, onHide, anuncioId }) {
  const navigate = useNavigate();

  function getCSRFToken() {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/anuncios/api/anuncio/${anuncioId}/apagar/`, {
        headers: {
          'X-CSRFToken': getCSRFToken(),
        },
        withCredentials: true,
      });
      onHide();
      window.location.reload();
      // navigate('/anuncio');
      navigate(-1);
    } catch (error) {
      if (error.response) {
        console.error('Erro ao apagar:', error.response.status, error.response.data);
      } else {
        console.error('Erro de rede ou desconhecido:', error.message);
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Anúncio</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Tem a certeza que pretende eliminar o anúncio?</p>
        <p><strong>Esta ação não pode ser desfeita.</strong></p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteAnuncioModal;