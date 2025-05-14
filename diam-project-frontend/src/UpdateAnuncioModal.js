import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function UpdateAnuncioModal({ show, onHide, anuncio }) {
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        distrito: '',
        contacto: '',
        tipo_servico: [],
        imagem_perfil: '',  // Este campo será mantido vazio
        imagens: [],  // Galeria de imagens vazia
    });

    useEffect(() => {
        if (anuncio) {
            setFormData({
                titulo: anuncio.titulo || '',
                descricao: anuncio.descricao || '',
                distrito: anuncio.distrito || '',
                contacto: anuncio.contacto || '',
                tipo_servico: anuncio.tipo_servico || [],
                imagem_perfil: '',  // Foto vazia para o utilizador preencher
                imagens: anuncio.imagens || [],  // Preencher a galeria de imagens
            });
        }
    }, [anuncio]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        setFormData({
            ...formData,
            imagens: [...files], // Atualiza as imagens da galeria com os novos arquivos
        });
    };

    function getCSRFToken() {
        return document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
    }

    const csrfToken = getCSRFToken();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formPayload = new FormData();

        // Adiciona os dados do formData ao FormData
        formPayload.append('titulo', formData.titulo);
        formPayload.append('descricao', formData.descricao);
        formPayload.append('distrito', formData.distrito.id);
        formPayload.append('contacto', formData.contacto);
        formPayload.append('tipo_servico', formData.tipo_servico.id);

        // Adiciona a imagem de perfil apenas se houver
        if (formData.imagem_perfil) {
            formPayload.append('imagem_perfil', formData.imagem_perfil);
        }

        // Adiciona as imagens da galeria se houver
        if (formData.imagens.length > 0) {
            Array.from(formData.imagens).forEach((imagem, index) => {
                formPayload.append(`imagens[${index}]`, imagem);
            });
        }

        try {
            // Envia a requisição PATCH para atualizar o anúncio
            await axios.put(
                `http://localhost:8000/anuncios/api/anuncio/${anuncio.id}/atualizar/`,
                formPayload,
                {
                    headers: {
                        "X-CSRFToken": csrfToken,
                    },
                    withCredentials: true
                }
            );
            console.log("Anúncio atualizado com sucesso!");
            onHide();  // Fecha o modal após a atualização
        } catch (error) {
            if (error.response) {
                console.error("Erro da API:", error.response.status, error.response.data);
            } else {
                console.error("Erro de rede ou desconhecido:", error.message);
            }
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Anúncio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="titulo">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="descricao" className="mt-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="distrito" className="mt-3">
                        <Form.Label>Distrito</Form.Label>
                        <Form.Control
                            type="text"
                            name="distrito"
                            value={formData.distrito}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="contacto" className="mt-3">
                        <Form.Label>Contacto</Form.Label>
                        <Form.Control
                            type="text"
                            name="contacto"
                            value={formData.contacto}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="tipo_servico" className="mt-3">
                        <Form.Label>Tipo de Serviço</Form.Label>
                        <Form.Control
                            type="text"
                            name="tipo_servico"
                            value={formData.tipo_servico.join(', ')}  // Exibe os tipos como uma lista
                            onChange={(e) => setFormData({
                                ...formData,
                                tipo_servico: e.target.value.split(',').map(s => s.trim())  // Atualiza como um array
                            })}
                        />
                    </Form.Group>

                    {/* Foto de perfil, deixada vazia para o utilizador preencher se desejar */}
                    <Form.Group controlId="imagem_perfil" className="mt-3">
                        <Form.Label>Imagem de Perfil (Deixe em branco para manter a imagem atual)</Form.Label>
                        <Form.Control
                            type="text"
                            name="imagem_perfil"
                            value={formData.imagem_perfil}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Galeria de Imagens - Novo campo */}
                    <Form.Group controlId="imagens" className="mt-3">
                        <Form.Label>Imagens da Galeria (Deixe em branco para manter as imagens atuais)</Form.Label>
                        <Form.Control
                            type="file"
                            name="imagens"
                            multiple
                            onChange={handleImageChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">
                        Guardar alterações
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UpdateAnuncioModal;