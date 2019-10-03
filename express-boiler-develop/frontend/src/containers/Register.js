import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

export default class Register extends Component {

    constructor(props) {
        super(props)
        this.userName = React.createRef();
        this.password = React.createRef();
        this.password2 = React.createRef();

    }

    state =  {
        errors: {}
    }

    checkInputs = event => {
        event.preventDefault();
        let userName = this.userName.current.value
        let password = this.password.current.value
        let password2 = this.password2.current.value
        this.register(userName, password, password2);
    }

    async register(userName, password, password2) {
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
        if(result.status=== 200){
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
                        <Form.Group controlId="validationPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password"  ref={this.password} />
                        </Form.Group>
                        <Form.Group controlId="validationPassword2">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control required type="password"  ref={this.password2} />
                        </Form.Group>
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
