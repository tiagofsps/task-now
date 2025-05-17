import {useEffect, useState} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import logo from "./assets/TaskNow_logo.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import axios from 'axios';

function AnuncioClientView() {
    const navigate = useNavigate();
    const {anuncio_id} = useParams();  // Pega o id do anúncio da URL
    const [anuncio, setAnuncio] = useState(null);
    const [index, setIndex] = useState(0);  // Estado para o índice da imagem no carrossel

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/anuncios/api/anuncio/search/detalhes/${anuncio_id}/`)
            .then(response => {
                setAnuncio(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar detalhes do anúncio:', error);
            });
    }, [anuncio_id]);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);  // Atualiza o índice da imagem no carrossel
    };

    if (!anuncio) {
        return <p>Carregando...</p>;  // Exibe um texto enquanto os dados não são carregados
    }

    return (
        <div className="Container">
            <Link to="/">
                <img
                    alt="TaskNow Logo"
                    src={logo}
                    style={{height: '4em'}}
                />
            </Link>

            <div className="Subcontainer">
                <Row className="mb-3">
                    <Col>
                        <Badge bg="primary" className="me-2">{anuncio.titulo}</Badge>
                        <Badge bg="secondary" className="me-2">{anuncio.distrito.nome}</Badge>
                        <Badge bg="secondary">{anuncio.contacto}</Badge>
                    </Col>
                </Row>

                <div className="d-flex align-items-start mb-4">
                    {anuncio.imagem_perfil && (
                        <Image
                            style={{
                                height: '120px',
                                width: '120px',
                                objectFit: 'cover',
                                borderRadius: '10px',
                                marginRight: '20px'
                            }}
                            src={`http://localhost:8000${anuncio.imagem_perfil}`}
                            alt="Foto de perfil"
                            rounded
                        />
                    )}

                    <div>
                        <h5>{anuncio.primeiro_nome} {anuncio.ultimo_nome}</h5>
                        {anuncio.tipos_servico && anuncio.tipos_servico.length > 0 && (
                            <div className="mb-2">
                                <div className="mt-1">
                                    {anuncio.tipos_servico.map((tipo, idx) => (
                                        <Badge bg="secondary" key={idx} className="me-1">
                                            {tipo.designacao}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {anuncio.descricao && (
                            <div>
                                <strong>Descrição</strong>
                                <p>{anuncio.descricao}</p>
                            </div>
                        )}
                    </div>
                </div>

                <h5 style={{textAlign: "center"}}>Galeria</h5>
                {anuncio.imagens && anuncio.imagens.length > 0 && (
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        {anuncio.imagens.map((img, idx) => (
                            <Carousel.Item key={idx}>
                                <img
                                    style={{
                                        height: '500px',
                                        width: '500px',
                                        objectFit: 'cover',
                                        display: 'block',
                                        margin: '0 auto',
                                        borderRadius: '10px'
                                    }}
                                    className="d-block w-100"
                                    src={`http://localhost:8000${img.imagem}`}
                                    alt={`Imagem ${idx + 1}`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )}

            </div>
            <Button variant="primary">Enviar Mensagem</Button>
            {' '}
            <Button variant="primary" onClick={() => navigate(-1)}>Voltar à Pesquisa</Button>
        </div>
    );
}

export default AnuncioClientView;