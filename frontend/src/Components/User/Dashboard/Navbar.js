import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavbarTop = ({ connect, connected, becomeMember, logedin, logout }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/referee">Chessboard</Nav.Link>
            <Nav.Link href="/updateAccount">Update Account Info</Nav.Link>
            <Nav.Link href="/allUsers">Display All Users</Nav.Link>
            {!logedin && (
              <Button variant="success" onClick={becomeMember}>
                Login
              </Button>
            )}
            {logedin && (
              <Button variant="success" onClick={logout}>
                logout
              </Button>
            )}
          </Nav>
          <Nav>
            {!connected ? (
              <Button onClick={connect}>Connect to Metamask</Button>
            ) : (
              <p style={{ color: "white" }}>Connected to Metamask.</p>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavbarTop;
