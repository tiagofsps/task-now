import React, { useState, useEffect } from "react";
import { Modal, Button, Alert} from "react-bootstrap";
import axios from "axios";
import { getCSRFToken } from "./UseCSRFToken";

function DeleteTipoServicoModal({ show, onHide, onSuccess, tiposervico }) {
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (show) setErrorMsg(null);
  }, [show]);

  const handleDelete = async () => {
    if (!tiposervico) return;
    setErrorMsg(null);

    try {
      await axios.delete(`http://localhost:8000/anuncios/api/tipo_servico/${tiposervico.id}/apagar/`, {
        withCredentials: true,
        headers: {
          "X-CSRFToken": getCSRFToken(),
        },
      });
      onSuccess();
    } catch (error) {
      setErrorMsg(
          error.response?.data?.detail ||
          "Erro ao apagar tipo de serviço."
      );
    }
  };

  if (!tiposervico) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Apagar Tipo de Serviço</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        <p>
          Tem a certeza que quer apagar o tipo de serviço <b>{tiposervico.designacao}</b>?
          Esta ação não pode ser desfeita.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
            Apagar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteTipoServicoModal;