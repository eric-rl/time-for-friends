import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Navigationbar extends Component {
    render() {
        return (
            <div>
                        <div className="flex justify-center">
                            <NavLink className="nav-link" to="/" >Home</NavLink>
                            <NavLink className="nav-link" to="/friends">Friends</NavLink>
                            <NavLink className="nav-link" to="/add-friend">Add friend</NavLink>
                        </div>
                        <hr />
            </div>
        )
    }
}

export default Navigationbar
