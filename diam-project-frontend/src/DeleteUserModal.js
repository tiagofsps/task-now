import {Modal, Button} from "react-bootstrap";
import axios from "axios";
import {getCSRFToken} from "./UseCSRFToken";

function DeleteUserModal({show, onHide, user, onDeleted}) {

    const handleDelete = async () => {
        try {
            const csrfToken = getCSRFToken(); // move para aqui

            await axios.delete(`http://localhost:8000/utilizadores/api/utilizadores/${user.user.id}/delete/`, {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": csrfToken
                }
            });
            onHide();
        } catch (error) {
            console.error("Erro ao apagar utilizador:", error);
            alert("Erro ao apagar o utilizador.");
        }
    };

    if (!user) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminação</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Tens a certeza que queres apagar o seguinte utilizador?</p>
                <ul>
                    <li><strong>ID:</strong> {user.user.id}</li>
                    <li><strong>Username:</strong> {user.user.username}</li>
                    <li><strong>Email:</strong> {user.user.email}</li>
                    <li><strong>Tipo:</strong> {user.tipo}</li>
                </ul>
                <p>Esta ação <strong>não pode ser anulada</strong>.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="danger" onClick={handleDelete}>Apagar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteUserModal;
