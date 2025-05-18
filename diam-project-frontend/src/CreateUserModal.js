import React, {useState, useEffect} from "react";
import {Modal, Form, Button} from "react-bootstrap";
import axios from "axios";

function CreateUserModal({show, onHide, onUserCreated}) {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        contacto: "",
        password: "",
        confirmPassword: "",
        tipo: "",
    });

    useEffect(() => {
        if (!show) {
            setFormData({
                first_name: "",
                last_name: "",
                username: "",
                email: "",
                contacto: "",
                password: "",
                confirmPassword: "",
                tipo: "",
            });
            setPasswordMatchError(false);
        }
    }, [show]);

    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => {
            const updated = {...prev, [name]: value};
            if (name === "password" || name === "confirmPassword") {
                setPasswordMatchError(updated.password !== updated.confirmPassword);
            }
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("As passwords não coincidem.");
            return;
        }
        try {
            await axios.post("http://localhost:8000/utilizadores/api/signup/", {
                user: {
                    username: formData.username,
                    password: formData.password,
                    email: formData.email,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                },
                contacto: formData.contacto,
                tipo: formData.tipo,
            });

            // Notifica o componente pai que um novo user foi criado (opcional)
            if (onUserCreated) onUserCreated();

            onHide(); // Fecha o modal
        } catch (error) {
            console.error(error);
            alert("Erro ao criar utilizador: " + error.message);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Criar Novo Utilizador</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Primeiro Nome</Form.Label>
                        <Form.Control type="text" name="first_name" required onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Último Nome</Form.Label>
                        <Form.Control type="text" name="last_name" required onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nome de Utilizador</Form.Label>
                        <Form.Control type="text" name="username" required onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" required onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contacto</Form.Label>
                        <Form.Control type="tel" name="contacto" required onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" required onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Confirmar Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            required
                            onChange={handleChange}
                            isInvalid={passwordMatchError}
                        />
                        <Form.Control.Feedback type="invalid">
                            As passwords não coincidem.
                        </Form.Control.Feedback>
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
                    <Button variant="success" type="submit" disabled={passwordMatchError}>
                        Criar Utilizador
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CreateUserModal;