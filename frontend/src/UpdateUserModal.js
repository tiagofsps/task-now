import React, {useEffect, useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import axios from "axios";
import {getCSRFToken} from "./UseCSRFToken";

function UpdateUserModal({show, onHide, user}) {
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        contacto: "",
        tipo: "cliente"
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.user.username || "",
                first_name: user.user.first_name || "",
                last_name: user.user.last_name || "",
                email: user.user.email || "",
                contacto: user.contacto || "",
                tipo: user.tipo || "cliente"
            });
        }
    }, [user]);

    useEffect(() => {
        if (!show) {
            setFormData({
                first_name: "",
                last_name: "",
                username: "",
                email: "",
                contacto: "",
                tipo: "",
            });
        }
    }, [show]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const csrfToken = getCSRFToken();

            await axios.put(`http://localhost:8000/utilizadores/api/utilizadores/${user.user.id}/update/`, {
                user: {
                    username: formData.username,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email
                },
                contacto: formData.contacto,
                tipo: formData.tipo
            }, {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": csrfToken
                }
            });
            onHide();
        } catch (error) {
            console.error("Erro ao atualizar utilizador:", error);
            alert("Erro ao atualizar utilizador.");
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Utilizador</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>

                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" value={formData.username} onChange={handleChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Primeiro Nome</Form.Label>
                        <Form.Control name="first_name" value={formData.first_name} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Último Nome</Form.Label>
                        <Form.Control name="last_name" value={formData.last_name} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contacto</Form.Label>
                        <Form.Control name="contacto" value={formData.contacto} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Utilizador</Form.Label>
                        <Form.Select name="tipo" value={formData.tipo} onChange={handleChange} required>
                            <option value="" disabled hidden>Selecione o tipo</option>
                            <option value="cliente">Cliente</option>
                            <option value="prestador">Prestador</option>
                            <option value="administrador">Administrador</option>
                        </Form.Select>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Guardar Alterações
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default UpdateUserModal;
