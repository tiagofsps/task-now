import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

function MensagensLista() {
  const [conversas, setConversas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/chat/api/conversas/", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setConversas(data))
      .catch(err => console.error("Erro ao carregar conversas:", err));
  }, []);

  return (
    <>
      <Header />
      <Container style={{ marginTop: "40px", marginBottom: "40px", maxWidth: "800px" }}>
        <h2 className="mb-4">As tuas conversas</h2>

        {conversas.length === 0 ? (
          <p className="text-muted">Não tens conversas ainda.</p>
        ) : (
          <Card>
            <ListGroup variant="flush">
              {conversas.map((c) => {
                const u = c.utilizador;
                if (!u || !u.id) return null;
                return (
                  <ListGroup.Item
                    key={u.id}
                    action
                    onClick={() => navigate(`/chat/${u.id}`)}
                    className="d-flex justify-content-between align-items-center"
                    style={{ cursor: "pointer" }}
                  >
                    <strong>{u.username}</strong>
                    {c.tem_novas && (
                      <Badge bg="danger" pill>
                        NOVAS MENSAGENS
                      </Badge>
                    )}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default MensagensLista;