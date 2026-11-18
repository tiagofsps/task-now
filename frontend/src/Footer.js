import Nav from 'react-bootstrap/Nav';

function Footer() {
  return (
    <>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/about">Sobre nós</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/contactos">Contactos</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Footer;