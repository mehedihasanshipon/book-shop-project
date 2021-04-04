import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Header.css";
import bookLogo from "../../icons/book-logo.png";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  console.log(loggedInUser);
  return (
    <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
      <div className="container">
        <Link className="navbar-brand nav-brand" to="/">
          {" "}
          <img className="img-fluid book-logo" src={bookLogo} alt="" />{" "}
          Pick-a-Book
        </Link>
        <Navbar.Toggle className="nav-toggle">
          <img src="https://img.icons8.com/ios/30/000000/menu--v6.png" alt="" />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/orders" className="nav-link">
              Orders
            </Link>
            <Link to="/admin" className="nav-link">
              Admin
            </Link>
            <Link className="nav-link">Deals</Link>
            <Link to="/login" className="nav-link">
              {loggedInUser.email ? (
                <img src={loggedInUser.photo || "logo"} alt="" />
              ) : (
                <span className="btn nav-login">Login</span>
              )}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
