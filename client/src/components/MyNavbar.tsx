import React, { useContext, useState } from "react";
import { Link, NavLink, Routes, Route, Navigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Home from "../pages/SignUp";
import DetailsCard from "../pages/DetailsCard";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute"; // Import your ProtectedRoute component

const MyNavbar = ({ logout }) => {
  const [expanded, setExpanded] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="your-logo-url.png" // replace with your logo URL
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
              <>
                <NavDropdown
                  title={`Welcome, ${user.email}`}
                  id="collapsible-nav-dropdown"
                >
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  as={NavLink}
                  to="/profile"
                  onClick={() => setExpanded(false)}
                >
                  Profile
                </Nav.Link>
              </>
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
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;

// import React, { useContext, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
// import { AuthContext } from "../context/AuthContext";

// const MyNavbar = ({ logout }) => {
//   const [expanded, setExpanded] = useState(false);
//   const { user } = useContext(AuthContext);

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded}>
//       <Container>
//         <Navbar.Brand as={Link} to="/">
//           <img
//             src="your-logo-url.png" // replace with your logo URL
//             alt="Logo"
//             height="30"
//             className="d-inline-block align-top"
//           />
//         </Navbar.Brand>
//         <Navbar.Toggle
//           aria-controls="responsive-navbar-nav"
//           onClick={() => setExpanded(!expanded)}
//         />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="mr-auto">
//             <Nav.Link as={NavLink} to="/" onClick={() => setExpanded(false)}>
//               Home
//             </Nav.Link>
//             <Nav.Link
//               as={NavLink}
//               to="/details"
//               onClick={() => setExpanded(false)}
//             >
//               Details
//             </Nav.Link>
//           </Nav>
//           <Nav>
//             {user ? (
//               <NavDropdown
//                 title={`Welcome, ${user.email}`}
//                 id="collasible-nav-dropdown"
//               >
//                 <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
//               </NavDropdown>
//             ) : (
//               <>
//                 <Nav.Link
//                   as={NavLink}
//                   to="/login"
//                   onClick={() => setExpanded(false)}
//                 >
//                   Login
//                 </Nav.Link>
//                 <Nav.Link
//                   as={NavLink}
//                   to="/signup"
//                   onClick={() => setExpanded(false)}
//                 >
//                   Signup
//                 </Nav.Link>
//                 <Nav.Link
//                   as={NavLink}
//                   to="/profile"
//                   onClick={() => setExpanded(false)}
//                 >
//                   Profile
//                 </Nav.Link>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default MyNavbar;
