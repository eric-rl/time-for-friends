import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

class Navigationbar extends Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="/">Time for friends</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink className="nav-link" to="/" style={{color: 'rgba(255,255,255,.5)', textDecoration: 'none'}}>Home</NavLink>
                            <NavLink className="nav-link" to="/friends" style={{color: 'rgba(255,255,255,.5)', textDecoration: 'none'}}>Friends</NavLink>
                            <NavLink className="nav-link" to="/add-friend" style={{color: 'rgba(255,255,255,.5)', textDecoration: 'none'}}>Add friend</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigationbar
