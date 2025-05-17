import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import logo from "./assets/TaskNow_logo.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MultiSelectDropdown from "./MultiSelectDropdown";

function CreateAnuncio() {
    const [distritos, setDistritos] = useState([]);
    const [tipos_servico, setTipos_servico] = useState([]);
    const [formError, setFormError] = useState(false);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/anuncios/api/distritos/")
            .then((response) => {
                setDistritos(response.data);
            })
            .catch((error) => {
                console.error("Erro ao obter distritos:", error);
            });
    }, []);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/anuncios/api/tipos_servico/")
            .then((response) => {
                const options = response.data.map(servico => ({
                    value: servico.id,
                    label: servico.designacao
                }));
                setTipos_servico(options);
            })
            .catch((error) => {
                console.error("Erro ao obter tipos de serviço:", error);
            });
    }, []);

    const [formData, setFormData] = useState({
        titulo: "",
        foto_perfil: null,
        tipos_servico: [],
        distrito: "",
        descricao: "",
        imagens: []
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handlePerfilChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({...prev, foto_perfil: file}));
        }
    };

    const handleFotosChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({...prev, fotos: files}));
    };

    function getCSRFToken() {
        return document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.tipos_servico.length === 0) {
            setFormError(true);
            return;
        }

        setFormError(false);

        const formPayload = new FormData();
        formPayload.append("titulo", formData.titulo);
        formPayload.append("imagem_perfil", formData.foto_perfil);
        formPayload.append("descricao", formData.descricao);
        formPayload.append("distrito", formData.distrito);
        formData.tipos_servico.forEach((tipo) => formPayload.append("tipo_servico", tipo));
        formData.imagens.forEach((img) => formPayload.append("images", img));

        const csrfToken = getCSRFToken();

        try {
            await axios.post(
                "http://localhost:8000/anuncios/api/anuncio/criar/",
                formPayload,
                {
                    headers: {
                        "X-CSRFToken": csrfToken,
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true
                }
            );
            navigate("/anuncio");
        } catch (error) {
            if (error.response) {
                console.error("Erro da API:", error.response.status, error.response.data);
            } else {
                console.error("Erro de rede ou desconhecido:", error.message);
            }
        }
    };

    return (
        <div className="Container p-4">
            <Link to="/">
                <img alt="TaskNow Logo" src={logo} style={{height: "4em"}}/>
            </Link>
            <div className="Subcontainer mt-4">
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>Título do Anúncio</Form.Label>
                        <Form.Control
                            type="text"
                            name="titulo"
                            required
                            value={formData.titulo}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Foto de Perfil</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handlePerfilChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Fotos da Galeria</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFotosChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tipos de serviço</Form.Label>
                        <div className="multiselect-container" style={{position: "relative"}}>
                            <MultiSelectDropdown
                                options={tipos_servico}
                                selectedValues={formData.tipos_servico}
                                onChange={selected => setFormData(prev => ({...prev, tipos_servico: selected}))}
                                label="tipos de serviço"
                            />
                        </div>
                        {formError && (
                            <div className="text-danger mt-1">Seleciona pelo menos um tipo de serviço.</div>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Distrito</Form.Label>
                        <Form.Select
                            name="distrito"
                            required
                            onChange={handleChange}
                            value={formData.distrito}
                        >
                            <option value="" disabled>Seleciona um distrito</option>
                            {distritos.map((distrito) => (
                                <option key={distrito.id} value={distrito.id}>
                                    {distrito.nome}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descricao"
                            required
                            onChange={handleChange}
                            value={formData.descricao}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Criar Anúncio
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default CreateAnuncio;