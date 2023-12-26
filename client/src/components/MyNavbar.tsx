import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import logo from "../images/logo.png";

const MyNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    // setExpanded(false); // Close the Navbar after logout
  };

  return (
    <Navbar
      style={{ backgroundColor: "#d47479" }}
      variant="dark"
      expand="lg"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Logo"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/" onClick={() => setExpanded(false)}>
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/details"
              onClick={() => setExpanded(false)}
            >
              Details
            </Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <NavDropdown
                title={`Welcome, ${user.name}`}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  onClick={() => setExpanded(false)}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/signup"
                  onClick={() => setExpanded(false)}
                >
                  Signup
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/profile"
                  onClick={() => setExpanded(false)}
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/postrequirements"
                  onClick={() => setExpanded(false)}
                >
                  Post
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
