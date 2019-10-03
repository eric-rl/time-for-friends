import React from 'react'
import { NavLink } from 'react-router-dom'
import { Store } from '../utilities/Store'

export default function Navigationbar(props) {
    const { state, dispatch } = React.useContext(Store);

    const logout = async () => {
        let result = await fetch('/api/user/logout');
        result = await result.json()
        if (result.success) {
            dispatch({ type: "LOGOUT_USER" })
        }
    }

    return (
        <div className="d-none d-sm-block">
            <div className="flex justify-center">
                <div className="flex">
                    {
                        state.isLoggedIn ? <NavLink className="nav-link" to="/" >Home</NavLink> : <p></p>
                    }
                    {
                        state.isLoggedIn ? <NavLink className="nav-link" to="/friends">Friends</NavLink> : <p></p>
                    }
                    {
                        state.isLoggedIn ? <NavLink className="nav-link" to="/add-friend">Add friend</NavLink> : <p></p>
                    }
                </div>
                <div className="flex">
                    {
                        state.isLoggedIn ? <div className="nav-link" onClick={logout}>Logout</div> : <NavLink className="nav-link" to="/login">Login</NavLink>
                    }
                    {
                        state.currentUser && state.currentUser.name ? <NavLink className="nav-link" to="/friends">{state.currentUser.name}</NavLink> : <p></p>
                    }
                </div>
            </div>
            <hr className="col-10 offset-1" />
        </div>
    )
}
