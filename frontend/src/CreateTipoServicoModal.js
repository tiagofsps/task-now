import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { getCSRFToken } from "./UseCSRFToken";

function CreateTipoServicoModal({ show, onHide, onSuccess }) {
  const [designacao, setDesignacao] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!designacao.trim()) {
      console.error("A designação do tipo de serviço é obrigatória.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/anuncios/api/tipo_servico/criar_tipo_servico/",
        { designacao: designacao.trim() },
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": getCSRFToken(),
          },
        }
      );
      setDesignacao("");
      onSuccess();
    } catch (error) {
      console.error("Erro ao criar tipo de serviço:", error.response || error);
    }
  };

  const handleClose = () => {
    setDesignacao("");
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Novo Tipo de Serviço</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="designacaoTipoServico">
            <Form.Label>Designação</Form.Label>
            <Form.Control
              type="text"
              value={designacao}
              onChange={(e) => setDesignacao(e.target.value)}
              placeholder="Insere a designação"
              autoFocus
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit">
            Criar Novo Tipo de Serviço
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CreateTipoServicoModal;