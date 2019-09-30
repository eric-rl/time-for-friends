import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

export default class Register extends Component {

    constructor(props) {
        super(props)
        this.userName = React.createRef();
        this.password = React.createRef();
    }

    checkInputs = event => {
        event.preventDefault();
        let userName = this.userName.current.value
        let password = this.password.current.value
        console.log(userName)
        console.log(password)
        this.register(userName, password);
    }

    async register(userName, password) {
        let data = {
            userName,
            password
        }

        let result = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    render() {
        return (
            <div className="justify-center tc">
                <h1 className='f1'>Register</h1>
                <Form noValidate onSubmit={this.checkInputs} className="flex row col-12 col-sm-8 offset-sm-2">
                    <div className="column col-12">
                        <Form.Group controlId="validationFirstname">
                            <Form.Label>First name</Form.Label>
                            <Form.Control required type="text" placeholder="Åke" ref={this.userName} />
                        </Form.Group>
                        <Form.Group controlId="validationLastname">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control required type="text" placeholder="Torsson" ref={this.password} />
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
