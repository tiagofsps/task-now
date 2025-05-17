import React, { useState, useEffect } from 'react';
import { getCSRFToken } from './UseCSRFToken';
import Header from './Header';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Chat({ destinatarioId }) {
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState('');
  const [userIdLogado, setUserIdLogado] = useState(null);
  const [usernameLogado, setUsernameLogado] = useState('');
  const [loading, setLoading] = useState(true);

  const carregarUserId = async () => {
    try {
      const res = await fetch(`http://localhost:8000/utilizadores/api/user/`, {
        credentials: 'include',
      });
      if (res.ok) {
        const dados = await res.json();
        setUserIdLogado(dados.id);
        setUsernameLogado(dados.username);
      }
    } catch (erro) {
      console.error('Erro ao buscar o utilizador logado:', erro);
    }
  };

  const carregarMensagens = async () => {
    try {
      const res = await fetch(`http://localhost:8000/chat/api/mensagens/?com=${destinatarioId}`, {
        credentials: 'include',
      });
      if (res.ok) {
        const dados = await res.json();
        setMensagens(dados);
        setLoading(false);
      }
    } catch (erro) {
      console.error('Erro ao buscar mensagens:', erro);
    }
  };

  const enviarMensagem = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return;

    const csrfToken = getCSRFToken();

    try {
      const res = await fetch('http://localhost:8000/chat/api/mensagens/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
          destinatario: destinatarioId,
          texto: texto.trim(),
        }),
      });

      if (res.ok) {
        setTexto('');
        carregarMensagens();
      } else {
        console.error("Erro ao enviar:", await res.text());
      }
    } catch (erro) {
      console.error('Erro ao enviar mensagem:', erro);
    }
  };

  useEffect(() => {
    carregarUserId();
    carregarMensagens();
    const intervalo = setInterval(carregarMensagens, 3000);
    return () => clearInterval(intervalo);
  }, [destinatarioId]);

  return (
    <>
      <Header />

      <Container style={{ maxWidth: '700px', marginTop: '40px', marginBottom: '40px' }}>
        <Card>
          <Card.Header>
            <h5 className="mb-0">Chat</h5>
          </Card.Header>

          <Card.Body style={{ maxHeight: '300px', overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            ) : mensagens.length === 0 ? (
              <p className="text-muted">Ainda não existem mensagens.</p>
            ) : (
              mensagens.map((m) => (
                <div key={m.id} style={{ marginBottom: '10px' }}>
                  <strong>{m.remetente_username}:</strong> {m.texto}
                  <span style={{ marginLeft: "10px", fontSize: "0.85em", color: m.lida ? "green" : "gray" }}>
                    {m.lida ? "✔️ Lida" : "⌛ Não lida"}
                  </span>
                </div>
              ))
            )}
          </Card.Body>

          <Card.Footer>
            <Form onSubmit={enviarMensagem} className="d-flex gap-2">
              <Form.Control
                type="text"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Escreve a tua mensagem..."
              />
              <Button type="submit" variant="primary">Enviar</Button>
            </Form>
          </Card.Footer>
        </Card>
      </Container>

      <Footer />
    </>
  );
}

export default Chat;