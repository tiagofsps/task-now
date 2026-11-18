import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import MultiSelectDropdown from "./MultiSelectDropdown";

function UpdateAnuncioModal({show, onHide, anuncio}) {
    const [distritos, setDistritos] = useState([]);
    const [tipos_servico, setTipos_servico] = useState([]);
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        distrito: '',
        contacto: '',
        tipos_servico: [],
        imagem_perfil: '',
        imagens: [],
    });

    useEffect(() => {
        console.log("Carregando distritos e tipos de serviço...");
        axios.get("http://127.0.0.1:8000/anuncios/api/distritos/")
            .then((res) => {
                console.log("Distritos recebidos:", res.data);
                setDistritos(res.data);
            })
            .catch((err) => console.error("Erro ao obter distritos:", err));

        axios.get("http://127.0.0.1:8000/anuncios/api/tipos_servico/")
            .then((res) => {
                console.log("Tipos de serviço recebidos:", res.data);
                const options = res.data.map(servico => ({
                    value: servico.id,
                    label: servico.designacao
                }));
                setTipos_servico(options);
            })
            .catch((err) => console.error("Erro ao obter tipos de serviço:", err));
    }, []);

    useEffect(() => {
        if (show && anuncio) {
            setFormData({
                titulo: anuncio.titulo || '',
                descricao: anuncio.descricao || '',
                distrito: anuncio.distrito?.id || '',
                contacto: anuncio.contacto || '',
                tipos_servico: anuncio.tipos_servico?.map(ts => ts.id) || [],
                imagem_perfil: '',
                imagens: [],
            });
        }
    }, [show, anuncio]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(`Campo alterado: ${name} = ${value}`);
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleFileChange = (e) => {
        console.log("Novas imagens selecionadas:", e.target.files);
        setFormData(prev => ({...prev, imagens: Array.from(e.target.files)}));
    };

    const getCSRFToken = () =>
        document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("A submeter o formulário com os dados:", formData);

        const formPayload = new FormData();
        formPayload.append('titulo', formData.titulo);
        formPayload.append('descricao', formData.descricao);
        formPayload.append('distrito', formData.distrito);
        formPayload.append('contacto', formData.contacto);
        formData.tipos_servico.forEach(id => {
            console.log("Adicionando tipo_servico ao formData:", id);
            formPayload.append('tipo_servico', id);
        });

        if (formData.imagem_perfil) {
            console.log("Adicionando imagem_perfil ao formData:", formData.imagem_perfil);
            formPayload.append('imagem_perfil', formData.imagem_perfil);
        }

        formData.imagens.forEach((img, index) => {
            console.log(`Adicionando imagem ${index} ao formData:`, img);
            formPayload.append('imagens', img);
        });

        try {
            const response = await axios.put(
                `http://localhost:8000/anuncios/api/anuncio/${anuncio.id}/atualizar/`,
                formPayload,
                {
                    headers: {
                        "X-CSRFToken": getCSRFToken(),
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true
                }
            );
            console.log("Resposta da API ao atualizar anúncio:", response.data);
            onHide();
            window.location.reload();
        } catch (error) {
            console.error("Erro ao atualizar anúncio:", error.response || error);
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

                    <Form.Group className="mt-3">
                        <Form.Label>Distrito</Form.Label>
                        <Form.Select
                            name="distrito"
                            required
                            value={formData.distrito}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Seleciona um distrito</option>
                            {distritos.map(d => (
                                <option key={d.id} value={d.id}>{d.nome}</option>
                            ))}
                        </Form.Select>
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

                    <Form.Group className="mt-3">
                        <Form.Label>Tipos de Serviço</Form.Label>
                        <MultiSelectDropdown
                            options={tipos_servico}
                            selectedValues={formData.tipos_servico}
                            onChange={selected => {
                                console.log("Tipos de serviço selecionados:", selected);
                                setFormData(prev => ({...prev, tipos_servico: selected}));
                            }}
                            label="tipos de serviço"
                        />
                    </Form.Group>

                    <Form.Group controlId="imagem_perfil" className="mt-3">
                        <Form.Label>Foto de Perfil</Form.Label>
                        <Form.Control
                            type="file"
                            name="imagem_perfil"
                            onChange={(e) => {
                                console.log("Imagem de perfil selecionada:", e.target.files[0]);
                                setFormData(prev => ({...prev, imagem_perfil: e.target.files[0]}));
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="imagens" className="mt-3">
                        <Form.Label>Fotos da Galeria</Form.Label>
                        <Form.Control
                            type="file"
                            name="imagens"
                            multiple
                            onChange={handleFileChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-4">
                        Guardar alterações
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UpdateAnuncioModal;