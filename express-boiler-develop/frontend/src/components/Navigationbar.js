import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Navigationbar extends Component {
    render() {
        return (
            <div className="d-none d-sm-block">
                        <div className="flex justify-center">
                            <NavLink className="nav-link" to="/" >Home</NavLink>
                            <NavLink className="nav-link" to="/friends">Friends</NavLink>
                            <NavLink className="nav-link" to="/add-friend">Add friend</NavLink>
                        </div>
                        <hr className="col-10 offset-1"/>
            </div>
        )
    }
}

export default Navigationbar
