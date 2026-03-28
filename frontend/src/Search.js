import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Container, Row, Col, ListGroup, ListGroupItem, Image, Button} from 'react-bootstrap';
import Header from "./Header";
import Footer from "./Footer";
import Searchbar from "./Searchbar";

function Search() {
    const location = useLocation();
    const navigate = useNavigate();
    const {tipos_servico = [], distritos = []} = location.state || {};
    const [anuncios, setAnuncios] = useState([]);

    useEffect(() => {
        if (tipos_servico.length === 0 || distritos.length === 0) return;

        const params = new URLSearchParams();
        tipos_servico.forEach(tipo => params.append('tiposervico_id', tipo));
        distritos.forEach(distrito => params.append('distrito_id', distrito));

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
            <Searchbar/>
            <Container className="mt-4">
                <Row>
                    {anuncios.length === 0 ? (
                        <p>Nenhum anúncio encontrado.</p>
                    ) : (
                        anuncios.map((anuncio, idx) => (
                            <Col md={4} key={idx} className="mb-3">
                                <ListGroup className="d-flex align-items-center">
                                    <div className="Container" style={{ padding: "35px" }}>
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
                                                <strong>{anuncio.tipos_servico.map(tipo => tipo.designacao).join(', ')}</strong><br/>
                                                <span>{anuncio.distrito.nome}</span>
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