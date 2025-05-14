import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MultiSelect } from 'primereact/multiselect';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function Searchbar() {
    const navigate = useNavigate();
    const [tiposServico, setTiposServico] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [formData, setFormData] = useState({
        tipos_servico: [],
        distritos: [],
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/anuncios/api/distritos/')
            .then((response) => {
                const options = response.data.map(d => ({
                    label: d.nome,
                    value: d.id
                }));
                setDistritos(options);
            })
            .catch((error) => {
                console.error('Erro ao obter distritos:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/anuncios/api/tipos_servico/')
            .then((response) => {
                const options = response.data.map(servico => ({
                    value: servico.id,
                    label: servico.designacao
                }));
                setTiposServico(options);
            })
            .catch((error) => {
                console.error('Erro ao obter tipos de serviço:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.tipos_servico.length === 0 || formData.distritos.length === 0) {
            alert('Seleciona pelo menos um tipo de serviço e um distrito.');
            return;
        }

        // Navegar para a página de resultados com os parâmetros da pesquisa
        navigate('/search/ver-anuncios', {
            state: {
                tipos_servico: formData.tipos_servico,
                distritos: formData.distritos
            }
        });
    };

    return (
        <Navbar className="bg-body-tertiary justify-content-between">
            <Form className="d-flex align-items-center w-100" onSubmit={handleSubmit}>
                <div className="me-3 w-50">
                    <FloatLabel>
                        <label className="form-label">Tipos de Serviço</label>
                        <MultiSelect
                            value={formData.tipos_servico}
                            options={tiposServico}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, tipos_servico: e.value }))
                            }
                            placeholder="Seleciona tipos de serviço"
                            optionLabel="label"
                            maxSelectedLabels={3}
                            className="w-85"
                            display="chip"
                        />
                    </FloatLabel>
                </div>

                <div className="me-3 w-50">
                    <FloatLabel>
                        <label className="form-label">Distritos</label>
                        <MultiSelect
                            value={formData.distritos}
                            options={distritos}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, distritos: e.value }))
                            }
                            placeholder="Seleciona distritos"
                            optionLabel="label"
                            maxSelectedLabels={3}
                            className="w-85"
                            display="chip"
                        />
                    </FloatLabel>
                </div>

                <Button type="submit" variant="primary">Pesquisar</Button>
            </Form>
        </Navbar>
    );
}

export default Searchbar;