import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

class Navigationbar extends Component {
    render() {
        return (
            <div>
                <Navbar fixed="top" className="blabla" bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand>Time for friends</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink className="nav-link" to="/" >Home</NavLink>
                            <NavLink className="nav-link" to="/friends">Friends</NavLink>
                            <NavLink className="nav-link" to="/add-friend">Add friend</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigationbar
