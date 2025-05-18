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
    const [isPrestador, setIsPrestador] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    // Função para verificar se o utilizador está logado
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get('http://localhost:8000/utilizadores/api/user/', {withCredentials: true});
            if (response.data.user && response.data.user.username) {
                setIsLoggedIn(true);  // Utilizador está logado
                if (response.data.tipo === 'prestador') {
                    setIsPrestador(true);
                } else if (response.data.tipo === 'administrador') {
                    setIsAdmin(true);
                }
            }
        } catch (error) {
            setIsLoggedIn(false);  // Utilizador não está logado ou erro na requisição
        }
    };

    useEffect(() => {
        checkLoginStatus();  // Verificar se o utilizador está logado ao carregar o componente
    }, []);

    return (
        <>
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
                                <Dropdown.Item onClick={() => navigate('/profile')}>Perfil</Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate('/mensagens')}>Mensagens</Dropdown.Item>
                                {isPrestador ? (
                                    <Dropdown.Item onClick={() => navigate('/anuncio')}>Anunciar</Dropdown.Item>
                                ) : null}
                                {isAdmin ? (
                                    <>
                                        <Dropdown.Item onClick={() => navigate('/admin/gerir-utilizadores')}>Gerir Utilizadores</Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate('/admin/gerir-servicos')}>Gerir Serviços</Dropdown.Item>
                                    </>
                                    ) : null}
                                <Dropdown.Item
                                    onClick={async () => {
                                        try {
                                            await axios.get('http://localhost:8000/utilizadores/api/logout/', {
                                                withCredentials: true,
                                            });
                                            navigate('/');
                                            window.location.reload();
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
        </>
    );
}

export default Header;