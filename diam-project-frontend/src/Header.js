import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import logo from './assets/TaskNow_logo.png';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="TaskNow Logo"
              src={logo}
              style={{ height: '4em' }}
            />
          </Navbar.Brand>
          <Button variant="primary" onClick={() => navigate('/login')}>
            Iniciar Sessão
          </Button>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;