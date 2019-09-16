import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

class Navigationbar extends Component {
    render() {
        return (
            <div>
                        <div className="tc">
                            <NavLink className="nav-link" to="/" >Home</NavLink>
                            <NavLink className="nav-link" to="/friends">Friends</NavLink>
                            <NavLink className="nav-link" to="/add-friend">Add friend</NavLink>
                        </div>
            </div>
        )
    }
}

export default Navigationbar
