import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Container,Nav,NavDropdown,Offcanvas,Button,Form,FormControl} from 'react-bootstrap'
import {NavLink} from'react-router-dom';

class Dashboard extends React.Component {
  
  render() {
    return (
      <>
      <>
  {[false].map((expand) => (
    <Navbar key={expand} bg="light" expand={expand} className="mb-3">
      <Container fluid>
      <NavLink to="/" className='navbar-brand'>Akar logo</NavLink>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/login">Login</NavLink>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  ))}
</>
      </>
    );
  }
}

export default Dashboard;