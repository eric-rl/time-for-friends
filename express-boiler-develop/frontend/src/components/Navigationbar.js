import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Navigationbar extends Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="/">Time for friends</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link ><Link to="/" style={{color: 'rgba(255,255,255,.5)', textDecoration: 'none'}}>Home</Link></Nav.Link>
                            <Nav.Link ><Link to="/friends" style={{color: 'rgba(255,255,255,.5)', textDecoration: 'none'}}>Friends</Link></Nav.Link>
                            <Nav.Link ><Link to="/add-friend" style={{color: 'rgba(255,255,255,.5)', textDecoration: 'none'}}>Add friend</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigationbar
