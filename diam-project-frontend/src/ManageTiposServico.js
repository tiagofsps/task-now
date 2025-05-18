import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Header from './Header';
import Footer from './Footer';
import axios from "axios";
import CreateTipoServicoModal from "./CreateTipoServicoModal";
import UpdateTipoServicoModal from "./UpdateTipoServicoModal";
import DeleteTipoServicoModal from "./DeleteTipoServicoModal";

function ManageTiposServico() {
    const [tiposServico, setTiposServico] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Controlo dos modais
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedTipoServico, setSelectedTipoServico] = useState(null);

    useEffect(() => {
        fetchTiposServico();
    }, []);

    const fetchTiposServico = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8000/anuncios/api/tipos_servico/", {withCredentials: true});
            setTiposServico(response.data);
            setError(null);
        } catch (err) {
            setError("Erro a carregar os tipos de serviço.");
        } finally {
            setLoading(false);
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

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Header/>
            <h2 style={{ textAlign: "center", margin: "20px 0" }}>Tipos de Serviço</h2>



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