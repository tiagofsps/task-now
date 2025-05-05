import {useState} from "react";
import {Link} from "react-router-dom";
import logo from "./assets/TaskNow_logo.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function Signup() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        contacto: "",
        password: "",
        confirmPassword: "",
        tipo: "",
        termsAccepted: false,
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("As passwords não coincidem.");
            return;
        }
        if (!formData.termsAccepted) {
            alert("Tens de aceitar os termos e condições.");
            return;
        }

        try {
            await axios.post("http://localhost:8000/utilizadores/api/signup/", {
                user: {
                    username: formData.username,
                    password: formData.password,
                    email: formData.email,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                },
                contacto: formData.contacto,
                tipo: formData.tipo,
            });
            alert("Utilizador criado com sucesso!");
        } catch (error) {
            console.error(error);
            alert("Erro ao criar utilizador.");
        }
    };

    return (
        <div className="Container">
            <Link to="/">
                <img
                    alt="TaskNow Logo"
                    src={logo}
                    style={{height: "4em"}}
                />
            </Link>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Primeiro Nome</Form.Label>
                    <Form.Control type="text" name="first_name" required onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Último Nome</Form.Label>
                    <Form.Control type="text" name="last_name" required onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nome de Utilizador</Form.Label>
                    <Form.Control type="text" name="username" required onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" required onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contacto</Form.Label>
                    <Form.Control type="tel" name="contacto" required onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" required onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirme a sua Password</Form.Label>
                    <Form.Control type="password" name="confirmPassword" required onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="radio"
                        label="Cliente"
                        name="tipo"
                        value="cliente"
                        required
                        onChange={handleChange}
                        checked={formData.tipo === "cliente"}
                    />
                    <Form.Check
                        type="radio"
                        label="Prestador de Serviços"
                        name="tipo"
                        value="prestador"
                        required
                        onChange={handleChange}
                        checked={formData.tipo === "prestador"}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Concordo com os termos e condições"
                        name="termsAccepted"
                        required
                        onChange={handleChange}
                        checked={formData.termsAccepted}
                    />
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