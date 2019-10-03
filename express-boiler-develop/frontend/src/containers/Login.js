import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Store } from '../utilities/Store'
import { Link } from 'react-router-dom'

export default function Register(props) {

    const { state, dispatch } = React.useContext(Store);
    const [userNameError, setUserNameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [password, setPassword] = useState('')
    const [userName, setUsername] = useState('')
    const handleChangeUsername = event => {
        setUsername(event.target.value)
    }

    useEffect(() => {
        checkLoginStatus()
        console.log(state.isLoggedIn)
    });

    const checkLoginStatus = async () => {
        let data = await fetch("/api/loggedinas");
        try {
            data = await data.json();
        } catch {
        }
        if (data.loggedIn && state.isLoggedIn === false) {
            dispatch({
                type: 'SET_LOGGEDIN',
            })
            dispatch({
                type: 'FETCH_CURRENT_USER',
                payload: data
            })
        } else if (!data.loggedIn && state.isLoggedIn === true) {
            dispatch({
                type: 'LOGOUT_USER'
            })
        }
        console.log("logged in?", data)

    }

    const handleChangePassword = event => {
        setPassword(event.target.value)
    }
    const checkInputs = event => {
        event.preventDefault();
        login(userName, password);
    }

    const fetchCurrentUser = async () => {
        const data = await fetch("/api/loggedinas");
        let currentUser = null
        try {
            currentUser = await data.json();
        } catch (err) {

        }
        dispatch({
            type: 'FETCH_CURRENT_USER',
            payload: currentUser
        })
    };

    const login = async (userName, password) => {
        setUserNameError(false)
        setPasswordError(false)
        let data = {
            userName,
            password,
        }

        let login = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        let result = await login.json()

        if (result.userNamenotfound === "Username or password was incorrect") {
            setUserNameError(true)
        } else if (result.passwordincorrect === "Username or password was incorrect") {
            setPasswordError(true)
        } else {
            dispatch({
                type: 'SET_LOGGEDIN',
                payload: true
            })

            await fetchCurrentUser()
            await props.history.push('/')

        }
    }

    return (
        <div className="justify-center tc">
            <h1 className='f1'>Login</h1>
            <Form noValidate onSubmit={checkInputs} className="flex row col-12 col-sm-8 offset-sm-2 m-0">
                <div className="column col-12">
                    <Form.Group controlId="validationFirstname">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text" placeholder="Åke" onChange={handleChangeUsername} />
                    </Form.Group>
                    {userNameError ? <p className="warningSleep">Username or password is incorrect</p> : ''}
                    <Form.Group controlId="validationPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="password" onChange={handleChangePassword} />
                    </Form.Group>
                    {passwordError ? <p className="warningSleep">Username or password is incorrect</p> : ''}
                </div>
                <div className="column col-12 flex justify-center">
                    <Button className="mt-4 mb-5" type="submit" variant="primary">
                        Login
                </Button>
                </div>
            </Form>
            <h1 className="f1">Not A memeber?</h1>
            <div className="column col-12 flex justify-center">
                <Link to={{
                    pathname: "/register",

                }}>
                    <Button className="mt-4 mb-5" variant="primary">
                        Register
                </Button>
                </Link>
            </div>
        </div>
    )
}

