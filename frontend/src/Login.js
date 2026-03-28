import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from "./assets/TaskNow_logo.png";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/utilizadores/api/login/', {username, password}, {withCredentials: true});
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                alert('Login failed: ' + error.response.data.error);
            } else {
                alert('Erro ao efetuar login: ' + 'verifique as suas credenciais e tente novamente e se o erro persistir contacte a nossa equipa');
                console.error('Erro:', error);
            }
        }
    };

    return (
        <div className="Container">
            <Link to="/">
                <img
                    alt="TaskNow Logo"
                    src={logo}
                    style={{height: '4em'}}
                />
            </Link>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome de Utilizador</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Insira o seu nome de utilizador"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p className="mt-3 text-center">
                Ainda não estás registado? <Link to="/signup">Signup</Link>
            </p>
        </div>
    );
}

export default Login;