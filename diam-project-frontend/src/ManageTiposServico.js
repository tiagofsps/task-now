import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Header from './Header';
import Footer from './Footer';
import axios from "axios";
import CreateTipoServicoModal from "./CreateTipoServicoModal";
import UpdateTipoServicoModal from "./UpdateTipoServicoModal";
import DeleteTipoServicoModal from "./DeleteTipoServicoModal";
import ErrorPagePermissions from "./ErrorPagePermissions";

function ManageTiposServico() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [tiposServico, setTiposServico] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Controlo dos modals
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTipoServico, setSelectedTipoServico] = useState(null);

    // Verifica o estado de login e permissões
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
                        await fetchTiposServico();
                    }
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    // Caso não esteja autenticado
    if (isLoggedIn === false) {
        navigate("/login");
        return null;
    }

    const fetchTiposServico = async () => {
        try {
            const response = await axios.get("http://localhost:8000/anuncios/api/tipos_servico/", {withCredentials: true});
            setTiposServico(response.data);
            setError(null);
        } catch (err) {
            setError("Erro a carregar os tipos de serviço.");
        }
    };

    // Ao fechar um modal, recarregar a lista (passa como prop para os modais)
    const onModalSuccess = () => {
        fetchTiposServico();
        setShowCreateModal(false);
        setShowUpdateModal(false);
        setShowDeleteModal(false);
        setSelectedTipoServico(null);
    };

    if (error) return <div>{error}</div>;

    return (
        <>
            <Header/>
            {isLoggedIn === null ? (
                <p>A verificar sessão...</p>
            ) : isAdmin ? (
                <>
                    <h2 style={{textAlign: "center", margin: "20px 0"}}>Tipos de Serviço</h2>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tipo de Serviço</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tiposServico.map(({id, designacao}) => (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{designacao}</td>
                                <td>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => {
                                            setSelectedTipoServico({id, designacao});
                                            setShowUpdateModal(true);
                                        }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedTipoServico({id, designacao});
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        Apagar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <div className="text-center mb-4">
                        <Button
                            variant="success"
                            onClick={() => setShowCreateModal(true)}
                        >
                            Novo Tipo de Serviço
                        </Button>
                    </div>
                </>
            ) : (
                <ErrorPagePermissions/>
            )}
            <Footer/>
            {/* Modals */}
            {showCreateModal && (
                <CreateTipoServicoModal
                    show={showCreateModal}
                    onHide={() => setShowCreateModal(false)}
                    onSuccess={onModalSuccess}
                />
            )}

            {showUpdateModal && selectedTipoServico && (
                <UpdateTipoServicoModal
                    show={showUpdateModal}
                    onHide={() => setShowUpdateModal(false)}
                    onSuccess={onModalSuccess}
                    tiposervico={selectedTipoServico}
                />
            )}

            {showDeleteModal && selectedTipoServico && (
                <DeleteTipoServicoModal
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    onSuccess={onModalSuccess}
                    tiposervico={selectedTipoServico}
                />
            )}
        </>
    );
}

export default ManageTiposServico;