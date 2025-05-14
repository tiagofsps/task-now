import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Container, Row, Col, ListGroup, ListGroupItem, Image, Button} from 'react-bootstrap';
import Header from "./Header";
import Footer from "./Footer";

function Search() {
    const location = useLocation();
    const navigate = useNavigate();
    const {tipos_servico = [], distritos = []} = location.state || {};
    const [anuncios, setAnuncios] = useState([]);

    useEffect(() => {
        if (tipos_servico.length === 0 || distritos.length === 0) return;

        const params = new URLSearchParams();
        tipos_servico.forEach(tipo => params.append('tipos_servico', tipo));
        distritos.forEach(distrito => params.append('distritos', distrito));

        axios.get(`http://127.0.0.1:8000/anuncios/api/anuncio/search/?${params.toString()}`)
            .then(response => {
                setAnuncios(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar anúncios:', error);
            });
    }, [tipos_servico, distritos]);

    return (
        <>
            <Header/>
            <Container className="mt-4">
                <Row>
                    {anuncios.length === 0 ? (
                        <p>Nenhum anúncio encontrado.</p>
                    ) : (
                        anuncios.map((anuncio, idx) => (
                            <Col md={4} key={idx} className="mb-3">
                                <ListGroup className="d-flex align-items-center">
                                    <div className="Container">
                                        <ListGroupItem className="d-flex align-items-center">
                                            <Image
                                                src={anuncio.imagem_perfil
                                                    ? `http://127.0.0.1:8000${anuncio.imagem_perfil}`
                                                    : 'https://via.placeholder.com/150'}
                                                roundedCircle
                                                style={{width: '120px', height: '120px', marginRight: '10px'}}
                                            />
                                            <div>
                                                <strong>{anuncio.titulo}</strong><br/>
                                                {anuncio.primeiro_nome} {anuncio.ultimo_nome}<br/>
                                                <span>{(anuncio.tipos_servico || []).join(', ')}</span><br/>
                                                <span>{anuncio.distrito}</span>
                                            </div>

                                        </ListGroupItem>
                                        <Button variant="primary"
                                                onClick={() => navigate(`/search/ver-anuncios/detalhes-anuncio/${anuncio.id}`)}>
                                            Ver Detalhes
                                        </Button>
                                    </div>
                                </ListGroup>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
            <Footer/>
        </>
    )
        ;
}

export default Search;