import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink,
} from "reactstrap";
import { Logout } from "./Logout";

const AppNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  const [name, setName] = useState("");
  useEffect(() => {
    let username: any = localStorage.getItem("user");
    setName(JSON.parse(username).username);
  }, []);

  const history = useHistory()

  const goProfile = () => {
    history.push('/')
  }
  const goMessage = () => {
    history.push('/social-media')
  }
  return (
    <Navbar color="dark" dark expand="sm" className="mb-5">
      <Container>
        <NavbarBrand onClick={goProfile}>Chat Room</NavbarBrand>
        <NavbarToggler onClick={handleToggle} />
        <Collapse navbar isOpen={isOpen}>
          <Nav className="ml-auto" navbar>
            <Fragment>
              <NavItem>
                <span className="navbar-text mr-3">
                  <strong>{name ? `Welcome ${name}` : ""}</strong>
                </span>
              </NavItem>
              <NavItem>
                <NavLink onClick={goMessage}>Social Media</NavLink>
              </NavItem>
              <NavItem>
                <NavItem>
                  <Logout />
                </NavItem>
              </NavItem>
            </Fragment>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNav;
