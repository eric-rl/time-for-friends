import React, { useState, useEffect } from 'react'
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap'
import { Store } from '../utilities/Store'

export default function Register(props) {


    const { state, dispatch } = React.useContext(Store);
    const [userNameError, setUserNameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [password, setPassword] = useState('')
    const [userName, setUsername] = useState('')

    const handleChangeUsername = event => {
        setUsername(event.target.value)
        console.log('userName : ', userName);
    }

    const handleChangePassword = event => {
        setPassword(event.target.value)
        console.log('passWord : ' ,password);
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
            console.log(currentUser)
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
        console.log(result)

        if (result.userNamenotfound === "Username or password was incorrect") {
            setUserNameError(true)
        } else if (result.passwordincorrect === "Username or password was incorrect") {
            setPasswordError(true)
        } else {
            await fetchCurrentUser()
            await props.history.push('/')

        }
    }


    return (
        <div className="justify-center tc">
            <h1 className='f1'>Login</h1>
            <Form noValidate onSubmit={checkInputs} className="flex row col-12 col-sm-8 offset-sm-2">
                <div className="column col-12">
                    <Form.Group controlId="validationFirstname">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text" placeholder="Åke"  onChange={handleChangeUsername} />
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
        </div>
    )
}

