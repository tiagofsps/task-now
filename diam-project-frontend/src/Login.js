import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from "./assets/TaskNow_logo.png";
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Enviar dados para o Django (login)
        const response = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            // Se o login for bem-sucedido, redirecionar ou armazenar o token
            console.log('Login bem-sucedido');
        } else {
            // Exibir uma mensagem de erro se o login falhar
            const data = await response.json();
            setError(data.detail || 'Login falhou. Tente novamente.');
        }
    };

    return (
        <div className="Container">
            <Link to="/">
                <img
                    alt="TaskNow Logo"
                    src={logo}
                    style={{ height: '4em' }}
                />
            </Link>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Insira o seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Concordo com os termos e condições" required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
}

export default Login;