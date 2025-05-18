import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import UpdateAnuncioModal from "./UpdateAnuncioModal";
import DeleteAnuncioModal from "./DeleteAnuncioModal";
import {Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";

function ManageAnuncioModal({show, onHide, anuncioId}) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [anuncio, setAnuncio] = useState(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const fetchAnuncio = async () => {
            if (!anuncioId) return;
            try {
                const res = await axios.get(`http://localhost:8000/anuncios/api/anuncio/search/detalhes/${anuncioId}/`, {
                    withCredentials: true,
                });
                setAnuncio(res.data);
            } catch (error) {
                setAnuncio(null);
            }
        };

        fetchAnuncio();
    }, [anuncioId]);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    if (!anuncio) return null;


    return (
        <>
            <Modal show={show} onHide={onHide} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Detalhes do Anúncio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Col>
                            <Badge bg="primary" className="me-2" style={{size: "20px"}}>{anuncio.titulo}</Badge>
                            <Badge bg="secondary">{anuncio.distrito.nome}</Badge>
                            <> </>
                            {/* adiciona um espaço entre os badges */}
                            <Badge bg="secondary">{anuncio.contacto}</Badge>
                        </Col>
                    </Row>

                    <div className="d-flex align-items-start mb-4">
                        {/* Foto de perfil à esquerda */}
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

                        {/* Conteúdo à direita */}
                        <div>
                            {/* Tipos de Serviço */}
                            <h5>{anuncio.primeiro_nome} {anuncio.ultimo_nome}</h5>
                            {anuncio.tipos_servico && anuncio.tipos_servico.length > 0 && (
                                <div className="mb-2">
                                    <div className="mt-1">
                                        {anuncio.tipos_servico.map((servico, idx) => (
                                            <Badge bg="secondary" key={idx} className="me-1">
                                                {servico.designacao}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}


                            {/* Descrição */}
                            {anuncio.descricao && (
                                <div>
                                    <strong>Descrição</strong>
                                    <p>{anuncio.descricao}</p>
                                </div>
                            )}
                        </div>

                    </div>

                    <h5 style={{textAlign: "center"}}>Galeria</h5>
                    {/* Carrossel de Imagens */}
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowEditModal(true)}>Editar Anúncio</Button>
                    <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Remover Anúncio</Button>
                </Modal.Footer>
            </Modal>
            <UpdateAnuncioModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                anuncio={anuncio}
            />

            <DeleteAnuncioModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                anuncioId={anuncioId}
            />
        </>
    );
}

export default ManageAnuncioModal;