import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useBot } from '../../Chess/Components/Bot/BotContext'; // Adjust the path as necessary

const NavbarTop = ({ connect, connected, becomeMember, logedin, logout }) => {
  const { toggleBot } = useBot();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/referee">PLay Game</Nav.Link>
            <Nav.Link onClick={() => toggleBot(true)} href="/referee?bot=true">Play With Bot</Nav.Link>
            <Nav.Link href="/addUser">Add User</Nav.Link>
            <Nav.Link href="/updateAccount">Update Account</Nav.Link>
            <Nav.Link href="/userInformation">User Info</Nav.Link>
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
