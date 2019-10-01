import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

export default class Register extends Component {

    constructor(props) {
        super(props)
        this.userName = React.createRef();
        this.password = React.createRef();
    }

    state = {
        userNameError: false,
        passwordError: false
    }

    checkInputs = event => {
        event.preventDefault();
        let userName = this.userName.current.value
        let password = this.password.current.value
        this.register(userName, password);
    }

    async register(userName, password) {
        this.setState({ userNameError: false, passwordError: false })
        let data = {
            userName,
            password,
        }

        let result = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(result)
        

        if (result.userNamenotfound === "Username not found") {
            this.setState({ userNameError: true })
        } else if (result.passwordincorrect === "Password incorrect") {
            this.setState({ passwordError: true })
        }
    }

    render() {
        return (
            <div className="justify-center tc">
                <h1 className='f1'>Login</h1>
                <Form noValidate onSubmit={this.checkInputs} className="flex row col-12 col-sm-8 offset-sm-2">
                    <div className="column col-12">
                        <Form.Group controlId="validationFirstname">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required type="text" placeholder="Åke" ref={this.userName} />
                        </Form.Group>
                        {this.state.userNameError ? <p className="warningSleep">Username doesn't exist</p> : ''}
                        <Form.Group controlId="validationPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="password" ref={this.password} />
                        </Form.Group>
                        {this.state.passwordError ? <p className="warningSleep">Username or password is incorrect</p> : ''}
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
}
