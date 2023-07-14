import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Nav,
  Navbar,
  NavbarToggler,
  Collapse,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./NavigationBar.css";
import { Link } from "react-router-dom";
import axios from "axios";

// import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import App from "../../App.js"

function NavigationBar() {
  const id = localStorage.getItem("user");
  let pathName = useMemo(
    () => window.location.pathname,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [window.location.pathname]
  );

  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  useEffect(() => {
    axios
      .get("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categories]);

  const handleLogout = (e) => {
    e.preventDefault();
    window.location.href = "/";
    localStorage.removeItem("user");
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="navBar1">
      <Navbar
        color="dark"
        dark
        className="fixed-top d-flex justify-content-between"
        expand="md">
        <NavItem>
          <Link to="/" className="text-white">
            The Wandering Mind
          </Link>
        </NavItem>
        <NavbarToggler onClick={toggle} style={{ width: "auto" }} />
        <Collapse
          className=""
          isOpen={isOpen}
          navbar
          style={{
            color: "white",
            width: "auto",
          }}>
          <Nav className="ml-auto" navbar>
            <NavItem
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle
                  tag="span"
                  onClick={toggleDropdown}
                  data-toggle="dropdown"
                  aria-expanded={dropdownOpen}
                  className={`caret-off ${
                    !pathName.split("/")[1] ? "text-white" : "text-secondary"
                  }`}>
                  <Link to="/">
                    <p
                      className={`m-2 ${
                        !!!pathName.split("/")[1]
                          ? "text-white"
                          : "text-secondary "
                      }`}>
                      Categories
                    </p>
                  </Link>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu">
                  {categories.map((row) => (
                    <DropdownItem>
                      <Link to={`/category/${row.urlName}`}>{row.name}</Link>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </NavItem>
            {!id ? (
              <>
                <NavItem>
                  <Link to="/login" onClick={toggle}>
                    <p
                      className={`m-2 ${
                        !!!pathName.split("/")[1]
                          ? "text-white"
                          : "text-secondary "
                      }`}>
                      {" "}
                      Login
                    </p>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/register" onClick={toggle}>
                    <p
                      className={`m-2 ${
                        !!!pathName.split("/")[1]
                          ? "text-white"
                          : "text-secondary "
                      }`}>
                      {" "}
                      Register
                    </p>
                  </Link>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <Link to="/profile" onClick={toggle}>
                    <p
                      className={`m-2 ${
                        !!!pathName.split("/")[1]
                          ? "text-white"
                          : "text-secondary "
                      }`}>
                      {" "}
                      Account
                    </p>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}>
                    <p
                      className={`m-2 ${
                        !!!pathName.split("/")[1]
                          ? "text-white"
                          : "text-secondary "
                      }`}>
                      {" "}
                      Logout
                    </p>
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
