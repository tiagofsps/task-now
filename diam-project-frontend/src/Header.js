import {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import logo from './assets/TaskNow_logo.png';
import {useNavigate} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Função para verificar se o utilizador está logado
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get('http://localhost:8000/utilizadores/api/user/', {withCredentials: true});
            if (response.data.username) {
                setIsLoggedIn(true);  // Utilizador está logado
            }
        } catch (error) {
            setIsLoggedIn(false);  // Utilizador não está logado ou erro na requisição
        }
    };

    useEffect(() => {
        checkLoginStatus();  // Verificar se o utilizador está logado ao carregar o componente
    }, []);

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt="TaskNow Logo"
                        src={logo}
                        style={{height: '4em'}}
                    />
                </Navbar.Brand>

                {isLoggedIn ? (
                    <Dropdown>
                        <Dropdown.Toggle variant="primary">
                            A tua conta
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => navigate('/perfil')}>Perfil</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/historico')}>Histórico</Dropdown.Item>
                            <Dropdown.Item
                                onClick={async () => {
                                    try {
                                        await axios.get('http://localhost:8000/utilizadores/api/logout/', {
                                            withCredentials: true,
                                        });
                                        // Opcional: mostra um alerta ou notificação
                                        alert('Logout efetuado com sucesso!');
                                        // Redirecionar para a homepage
                                        navigate('/');
                                        // (Opcional) Atualizar o estado de login local, se o estiveres a usar
                                        window.location.reload(); // para garantir que o Header reflete o novo estado
                                    } catch (error) {
                                        alert('Erro ao efetuar logout.');
                                        console.error(error);
                                    }
                                }}
                            >
                                Logout
                            </Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <Button variant="primary" onClick={() => navigate('/login')}>
                        Login
                    </Button>
                )}
            </Container>
        </Navbar>
    );
}

export default Header;