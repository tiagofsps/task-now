import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import logo from "./assets/TaskNow_logo.png";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UpdateAnuncioModal from "./UpdateAnuncioModal";
import DeleteAnuncioModal from "./DeleteAnuncioModal";

function AnuncioProviderView() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isPrestador, setIsPrestador] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [anuncio, setAnuncio] = useState(null);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        const fetchAnuncio = async () => {
            try {
                const res = await axios.get('http://localhost:8000/anuncios/api/anuncio/listar_anuncio_utilizador/', {
                    withCredentials: true,
                });
                setAnuncio(res.data);
            } catch (error) {
                setAnuncio(null);
            }
        };

        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('http://localhost:8000/utilizadores/api/user/', {
                    withCredentials: true,
                });
                if (response.data.user && response.data.user.username) {
                    setIsLoggedIn(true);
                    if (response.data.tipo === 'prestador') {
                        setIsPrestador(true);
                        fetchAnuncio();
                    } else {
                        navigate('/');
                    }
                } else {
                    navigate('/login');
                }
            } catch (error) {
                navigate('/login');
            }
        };

        checkLoginStatus();
    }, [navigate]);

    if (!anuncio && isLoggedIn && isPrestador) {
        return (
            <div className="Container text-center mt-5">
                <Link to="/">
                    <img
                        alt="TaskNow Logo"
                        src={logo}
                        style={{height: '4em'}}
                    />
                </Link>
                <p>Ainda não tens um anúncio.</p>
                <Button variant="primary" onClick={() => navigate('/anuncio/criar-anuncio')}>
                    Criar anúncio
                </Button>
            </div>
        );
    }

    if (!isLoggedIn || !isPrestador || !anuncio) {
        return <p>A carregar...</p>;
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
                        <Badge bg="primary" className="me-2" style={{size: "20px"}}>{anuncio.titulo}</Badge>
                        <Badge bg="secondary">{anuncio.distrito}</Badge>
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
                        {anuncio.tipo_servico && anuncio.tipo_servico.length > 0 && (
                            <div className="mb-2">
                                <div className="mt-1">
                                    {anuncio.tipo_servico.map((tipo, idx) => (
                                        <Badge bg="secondary" key={idx} className="me-1">{tipo}</Badge>
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
            </div>
            <Button variant="primary" onClick={() => setShowEditModal(true)}>Editar Anúncio</Button>
            {' '}
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Remover Anúncio</Button>

            <UpdateAnuncioModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                anuncio={anuncio}
            />

            <DeleteAnuncioModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                anuncioId={anuncio.id}
            />
        </div>
    );
}

export default AnuncioProviderView;