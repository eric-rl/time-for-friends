import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

export default class Register extends Component {

    constructor(props) {
        super(props)
        this.userName = React.createRef();
        this.password = React.createRef();
        this.password2 = React.createRef();

    }

    state = {
        userNameError: false,
        passwordError: false,
        passwordLengthError: false
    }

    checkInputs = event => {
        event.preventDefault();
        let userName = this.userName.current.value
        let password = this.password.current.value
        let password2 = this.password2.current.value
        this.register(userName, password, password2);
    }

    async register(userName, password, password2) {
        this.setState({ userNameError: false, passwordError: false, password2: false })
        let data = {
            userName,
            password,
            password2
        }

        let registerUser = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        let result = await registerUser.json()
        if (result.userName === "Username already exists") {
            this.setState({ userNameError: true })
        }
        if (result.password === "Password must be at least 6 characters") {
            this.setState({ passwordLengthError: true })
        }
        if (result.password2 === "Passwords must match") {
            this.setState({ passwordError: true })
        }
        if (result.status === 200) {
            this.props.history.push("/login")
        }
    }

    render() {
        return (
            <div className="justify-center tc">
                <h1 className='f1'>Register</h1>
                <Form noValidate onSubmit={this.checkInputs} className="flex row col-12 col-sm-8 offset-sm-2">
                    <div className="column col-12">
                        <Form.Group controlId="validationFirstname">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required type="text" ref={this.userName} />
                        </Form.Group>
                        {this.state.userNameError ? <p className="warningSleep">Username already exists</p> : ''}
                        <Form.Group controlId="validationPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" ref={this.password} />
                        </Form.Group>
                        {this.state.passwordLengthError ? <p className="warningSleep">Password must be atleast 6 characters</p> : ''}
                        <Form.Group controlId="validationPassword2">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control required type="password" ref={this.password2} />
                        </Form.Group>
                        {this.state.passwordError ? <p className="warningSleep">Passwords doesn't match</p> : ''}
                    </div>
                    <div className="column col-12 flex justify-center">
                        <Button className="mt-4 mb-5" type="submit" variant="primary">
                            Submit
                </Button>
                    </div>
                </Form>
            </div>
        )
    }
}
