import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { getCSRFToken } from "./UseCSRFToken";

function UpdateTipoServicoModal({ show, onHide, onSuccess, tiposervico }) {
  const [designacao, setDesignacao] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (tiposervico) {
      setDesignacao(tiposervico.nome);
      setErrorMsg(null);
    }
  }, [tiposervico, show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!designacao.trim()) {
      setErrorMsg("A designacao do tipo de serviço é obrigatório.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8000/anuncios/api/tipo_servico/${tiposervico.id}/atualizar/`,
        { designacao: designacao.trim() },
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": getCSRFToken(),
          },
        }
      );
      onSuccess();
    } catch (error) {
      console.error("Erro na API:", error.response);
      setErrorMsg(
        error.response?.data?.designacao
          ? error.response.data.designacao.join(", ")
          : "Erro ao atualizar tipo de serviço."
      );
    }
  };

  const handleClose = () => {
    setErrorMsg(null);
    setDesignacao("");
    onHide();
  };

  if (!tiposervico) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Tipo de Serviço</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="nomeTipoServicoEdit">
            <Form.Label>Nome do Tipo de Serviço</Form.Label>
            <Form.Control
              type="text"
              value={designacao}
              onChange={(e) => setDesignacao(e.target.value)}
              placeholder="Insere o nome"
              autoFocus
            />
          </Form.Group>
          {errorMsg && (
            <Alert variant="danger" className="mt-3">
              {errorMsg}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Atualizar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default UpdateTipoServicoModal;