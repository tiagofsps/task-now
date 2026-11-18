import Header from './Header';
import Footer from './Footer';
import ErrorPagePermissions from "./ErrorPagePermissions";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ManageAnuncioModal from './ManageAnuncioModal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from "axios";

function ManageAnuncios() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [anuncios, setAnuncios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAnuncioId, setSelectedAnuncioId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('http://localhost:8000/utilizadores/api/user/', {
                    withCredentials: true
                });
                if (response.data.user && response.data.user.username) {
                    setIsLoggedIn(true);
                    if (response.data.tipo === 'administrador') {
                        setIsAdmin(true);
                        await fetchAnuncios();
                    }
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    if (isLoggedIn === false) {
        navigate("/login");
        return null;
    }

    const fetchAnuncios = async () => {
        try {
            const response = await axios.get('http://localhost:8000/anuncios/api/anuncio/listar_anuncios/', {
                withCredentials: true
            });
            setAnuncios(response.data);
        } catch (error) {
            console.error("Erro ao carregar anuncios:", error);
        }
    };

    return (
        <>
            <Header/>
            {isLoggedIn === null ? (
                <p>A verificar sessão...</p>
            ) : isAdmin ? (
                <>
                    <h2 style={{textAlign: "center", margin: "20px 0"}}>Gestão de Anúncios</h2>
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Autor ID</th>
                            <th>Nome do Autor</th>
                            <th>Distrito</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {anuncios.map((anuncio, index) => (
                            <tr key={index}>
                                <td>{anuncio.id}</td>
                                <td>{anuncio.titulo}</td>
                                <td>{anuncio.autor}</td>
                                <td>{anuncio.primeiro_nome + " " + anuncio.ultimo_nome}</td>
                                <td>{anuncio.distrito?.nome}</td>
                                <td>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedAnuncioId(anuncio.id);
                                            setShowModal(true);
                                        }}
                                    >
                                        Ver Detalhes
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <ManageAnuncioModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        anuncioId={selectedAnuncioId}
                    />
                </>
            ) : (
                <ErrorPagePermissions/>
            )}
            <Footer/>
        </>
    );
}

export default ManageAnuncios;