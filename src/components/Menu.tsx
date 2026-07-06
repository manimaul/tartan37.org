import './Menu.css';
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import logo from '../assets/images/tartan37.svg';
import Navbar from 'react-bootstrap/Navbar';
import {Nav} from "react-bootstrap";
import {AuthContext} from "../AuthContext";

const menuStyle = {
    paddingRight: "10px",
    paddingLeft: "10px"
}

const menuContainerStyle = {
    marginBottom: "105px"
}

class MenuInternal extends Component<any, any> {

    static contextType = AuthContext;
    declare context: React.ContextType<typeof AuthContext>;

    getIsActive(path: string) {
        if (this.props.location.pathname.toUpperCase() === path.toUpperCase()) {
            return true
        } else {
            return false
        }
    }

    handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        fetch('/forum_logout.php', {method: 'POST', credentials: 'same-origin'})
            .then(() => this.context.setUsername(null));
    }

    render() {
        return (
            <div style={menuContainerStyle}>
                <Navbar style={menuStyle} bg="t37" expand="lg" variant="dark" collapseOnSelect={true} fixed="top">
                    <Navbar.Brand>
                        <Link className="logo" to={"/"}>
                            <img className="logo-img" src={logo}/>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link active={this.getIsActive("/fleet")} href="/fleet">Fleet</Nav.Link>
                            <Nav.Link active={this.getIsActive("/gallery")} href="/gallery">Gallery</Nav.Link>
                            <Nav.Link active={this.getIsActive("/specs")} href="/specs">Specifications</Nav.Link>
                            <Nav.Link active={this.getIsActive("/book")} href="/book">Owner's Booklet</Nav.Link>
                            <Nav.Link active={this.getIsActive("/resources")} href="/resources">Tech Resources</Nav.Link>
                            <Nav.Link href="https://tartan37.net/forum/index.php">Forum</Nav.Link>
                            <Nav.Link active={this.getIsActive("/history")} href="/history">History</Nav.Link>
                        </Nav>
                        <Nav>
                            {this.context.username ? (
                                <React.Fragment>
                                    <Navbar.Text>Logged in as {this.context.username}</Navbar.Text>
                                    <Nav.Link onClick={this.handleLogout} href="#">Logout</Nav.Link>
                                </React.Fragment>
                            ) : (
                                <Nav.Link active={this.getIsActive("/login")} href="/login">Login</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const Menu = withRouter(MenuInternal);

export default Menu;
