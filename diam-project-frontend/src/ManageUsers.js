import Header from './Header';
import Footer from './Footer';
import CreateUserModal from "./CreateUserModal";
import UpdateUserModal from "./UpdateUserModal";
import DeleteUserModal from "./DeleteUserModal";  // <---- IMPORTAR modal de apagar
import ErrorPagePermissions from "./ErrorPagePermissions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from "axios";

function ManageUsers() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [users, setUsers] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const navigate = useNavigate();

    // Função para carregar a lista de utilizadores
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/utilizadores/api/utilizadores/', {
                withCredentials: true
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Erro ao carregar utilizadores:", error);
        }
    };

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
                        await fetchUsers();
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

    // Abrir modal de apagar, com o objeto completo do user
    const handleDelete = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    // Abrir modal de edição
    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowUpdateModal(true);
    };

    // Após fechar modal de criação
    const handleCreateModalClose = async () => {
        setShowCreateModal(false);
        await fetchUsers();
    };

    // Após fechar modal de edição
    const handleEditModalClose = async () => {
        setShowUpdateModal(false);
        setSelectedUser(null);
        await fetchUsers();
    };

    // Após fechar modal de apagar (já dentro do modal tem o pedido delete)
    const handleDeleteModalClose = async () => {
        setShowDeleteModal(false);
        setUserToDelete(null);
        await fetchUsers();
    };

    return (
        <>
            <Header />
            {isLoggedIn === null ? (
                <p>A verificar sessão...</p>
            ) : isAdmin ? (
                <>
                    <h2 style={{ textAlign: "center", margin: "20px 0" }}>Gestão de Utilizadores</h2>
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Primeiro Nome</th>
                            <th>Último Nome</th>
                            <th>Email</th>
                            <th>Contacto</th>
                            <th>Tipo</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.user.id}</td>
                                <td>{user.user.username}</td>
                                <td>{user.user.first_name}</td>
                                <td>{user.user.last_name}</td>
                                <td>{user.user.email}</td>
                                <td>{user.contacto}</td>
                                <td>{user.tipo}</td>
                                <td>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Editar
                                    </Button>{' '}
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(user)}
                                    >
                                        Apagar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <div className="text-center mb-4">
                        <Button variant="success" onClick={() => setShowCreateModal(true)}>
                            Novo Utilizador
                        </Button>
                    </div>
                </>
            ) : (
                <ErrorPagePermissions />
            )}
            <Footer />

            {/* Modal de criação */}
            <CreateUserModal
                show={showCreateModal}
                onHide={handleCreateModalClose}
            />

            {/* Modal de atualização */}
            <UpdateUserModal
                show={showUpdateModal}
                onHide={handleEditModalClose}
                user={selectedUser}
            />

            {/* Modal de remoção */}
            <DeleteUserModal
                show={showDeleteModal}
                onHide={handleDeleteModalClose}
                user={userToDelete}
            />
        </>
    );
}

export default ManageUsers;