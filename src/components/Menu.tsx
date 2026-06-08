import './Menu.css';
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import logo from '../assets/images/tartan37.svg';
import Navbar from 'react-bootstrap/Navbar';
import {Nav} from "react-bootstrap";

const menuStyle = {
    paddingRight: "10px",
    paddingLeft: "10px"
}

const menuContainerStyle = {
    marginBottom: "105px"
}

class MenuInternal extends Component<any, any> {

    getIsActive(path: string) {
        if (this.props.location.pathname.toUpperCase() === path.toUpperCase()) {
            return true
        } else {
            return false
        }
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
                            <Nav.Link active={this.getIsActive("/resources")} href="/resources">Tech Resources</Nav.Link>
                            <Nav.Link href="https://www.tartan37.net/forum/index.php">Forum</Nav.Link>
                            <Nav.Link active={this.getIsActive("/history")} href="/history">History</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const Menu = withRouter(MenuInternal);

export default Menu;
