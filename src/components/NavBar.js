import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className="Navbar" expand="lg">
      <Navbar.Brand as={Link} to="/" className="navbar-title" style={{margin: '5px'}}>Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/courses" className="navbar-link">Courses</Nav.Link>
          <Nav.Link as={NavLink} to="/new" className="navbar-link">Add New Course</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;