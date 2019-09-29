import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

export default class NavigationbarMobile extends Component {

    render() {
        return (
            <div className="d-block d-sm-none">
                <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Brand >React-Bootstrap</Navbar.Brand>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <Nav.Link as={Link} eventKey="1" to="/">Home</Nav.Link>
                            <Nav.Link as={Link} eventKey="2" to="/friends">Friends</Nav.Link>
                            <Nav.Link as={Link} eventKey="3" to="/add-friend">Add friend</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
