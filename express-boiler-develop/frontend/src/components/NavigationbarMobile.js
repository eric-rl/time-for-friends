import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Store } from '../utilities/Store'

export default function NavigationbarMobile(props) {
    const { state, dispatch } = React.useContext(Store);

    const logout = async () => {
        let result = await fetch('/api/user/logout');
        result = await result.json()
        if (result.success) {
            dispatch({ type: "LOGOUT_USER" })
        }
    }

    return (
        <div className="d-block d-sm-none">
            <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Brand >
                    {
                        state.currentUser && state.currentUser.name ? <h1>{state.currentUser.name}</h1> : ''
                    }
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} eventKey="1" to="/">Home</Nav.Link>
                        <Nav.Link as={Link} eventKey="2" to="/friends">Friends</Nav.Link>
                        <Nav.Link as={Link} eventKey="3" to="/add-friend">Add friend</Nav.Link>
                        {
                            state.currentUser ? <div className="nav-link" onClick={logout}>Logout</div> : <NavLink className="nav-link" to="/login">Login</NavLink>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )

}
