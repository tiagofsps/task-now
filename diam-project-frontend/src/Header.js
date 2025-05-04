import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import logo from './assets/TaskNow_logo.png';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from "./AuthContext"; // importar o contexto corretamente

function Header() {
  const navigate = useNavigate();
  const { username, logout } = useAuth(); // usar diretamente o contexto

  console.log("Username atual:", username);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="TaskNow Logo"
            src={logo}
            style={{ height: '4em' }}
          />
        </Navbar.Brand>

        {username ? (
          <>
            <p className="mb-0">Olá, {username}!</p>
            <Dropdown>
              <Dropdown.Toggle variant="primary">
                A tua conta
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/perfil')}>Perfil</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/historico')}>Histórico</Dropdown.Item>
                <Dropdown.Item onClick={() => {
                  logout();
                  navigate('/');
                }}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          <>
            <Button variant="primary" onClick={() => navigate('/login')}>
              Login
            </Button>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;