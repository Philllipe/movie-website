import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavLink,
  NavbarText,
  NavbarBrand,
} from "reactstrap";

export function NavbarMain() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const URL = `https://localhost:8000/user/logout`;

  const logout = async () => {
    const refreshToken = localStorage.getItem("tokenRefresh");
    await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refreshToken }),
    }).catch(() => {});

    localStorage.removeItem("token");
    localStorage.removeItem("tokenRefresh");
    localStorage.removeItem("email");
    navigate("/login?logout=true");
  };

  const Logo = "https://cdn-icons-png.flaticon.com/512/5049/5049491.png";

  return (
    <Navbar color="dark" dark="true" expand="sm" container="fluid" fixed="top">
      <NavbarBrand>
        <img alt="logo" src={Logo} style={{ width: 50 }}></img>
        Rotten Apples
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar className="nav-link">
          <Link to="/">
            <NavLink>Home</NavLink>
          </Link>
          {!localStorage.getItem("token") && (
            <Link to="/login">
              <NavLink>Login</NavLink>
            </Link>
          )}
          {localStorage.getItem("token") && (
            <Link onClick={logout}>
              <NavLink>Logout</NavLink>
            </Link>
          )}
        </Nav>
      </Collapse>
      <NavbarText>{localStorage.getItem("email")}</NavbarText>
    </Navbar>
  );
}
