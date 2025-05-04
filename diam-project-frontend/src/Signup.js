import { Link } from "react-router-dom";
import logo from "./assets/TaskNow_logo.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Signup() {
    return (
        <div className="Container">
            <Link to="/">
                <img
                    alt="TaskNow Logo"
                    src={logo}
                    style={{ height: '4em' }}
                />
            </Link>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Primeiro Nome</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Último Nome</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nome de Utilizador</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contacto</Form.Label>
                    <Form.Control type="tel" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirme a sua Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check type="radio" label="Cliente" name="tipoUtilizador" required />
                    <Form.Check type="radio" label="Prestador de Serviços" name="tipoUtilizador" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Concordo com os termos e condições" required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Signup
                </Button>

                <p className="mt-3 text-center">
                    Já tens conta? <Link to="/login">Login</Link>
                </p>
            </Form>
        </div>
    );
}

export default Signup;