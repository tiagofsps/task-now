import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function Profile() {
  const [perfil, setPerfil] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/utilizadores/api/perfil/", {
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao carregar o perfil");
        return res.json();
      })
      .then(data => setPerfil(data))
      .catch(err => setErro(err.message));
  }, []);

  return (
    <>
      <Header />
      <Container style={{ marginTop: "40px", marginBottom: "40px", maxWidth: "600px" }}>
        <h2 className="mb-4">O Meu Perfil</h2>

        {erro ? (
          <Alert variant="danger">{erro}</Alert>
        ) : !perfil ? (
          <div className="text-center">
            <Spinner animation="border" role="status" />
            <p className="mt-2">A carregar perfil...</p>
          </div>
        ) : (
          <Card>
            <Card.Body>
              <Card.Title>
                {perfil.user.first_name} {perfil.user.last_name}
              </Card.Title>
              <Card.Subtitle className="mb-3 text-muted">{perfil.user.username}</Card.Subtitle>
              <ListGroup variant="flush">
                <ListGroup.Item><strong>Email:</strong> {perfil.user.email}</ListGroup.Item>
                <ListGroup.Item><strong>Contacto:</strong> {perfil.contacto}</ListGroup.Item>
                <ListGroup.Item><strong>Tipo:</strong> {perfil.tipo}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Profile;