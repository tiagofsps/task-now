import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';

function Searchbar() {
  const [query, setQuery] = useState('');
  const [sugestoes, setSugestoes] = useState([]);

  useEffect(() => {
    if (query.length === 0) {
      setSugestoes([]);
      return;
    }

    const fetchSugestoes = async () => {
      const response = await fetch(`http://localhost:8000/anuncios/sugerir-distritos/?q=${query}`);
      const data = await response.json();
      setSugestoes(data);
    };

    fetchSugestoes();
  }, [query]);

  return (
    <Navbar className="bg-body-tertiary justify-content-between">
      <Form inline>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">Tipo de Serviço</InputGroup.Text>
          <Form.Control
            placeholder="ex: eletricista"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </Form>
      <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              list="distritos"
              type="text"
              placeholder="Distrito"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <datalist id="distritos">
              {sugestoes.length > 0 ? (
                sugestoes.map((distrito, i) => (
                  <option key={i} value={distrito} />
                ))
              ) : (
                <option disabled>Sem resultados</option>
              )}
            </datalist>
          </Col>
          <Col xs="auto">
            <Button type="submit">Procurar</Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}

export default Searchbar;