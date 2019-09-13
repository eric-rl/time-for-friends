import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

export default class AddFriend extends Component {

    constructor(props) {
        super(props)
        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.email = React.createRef();
        this.phoneNumber = React.createRef();
        this.timezone = React.createRef();
        this.country = React.createRef();
        this.city = React.createRef();
    }

    async dataCheck() {
        let data = {
            name: {
                firstName: this.firstName.current.value,
                lastName: this.lastName.current.value
            },
            location: {
                timezone: this.timezone.current.value,
                country: this.country.current.value,
                city: this.city.current.value
            },
            email: this.email.current.value,
            phoneNumber: this.phoneNumber.current.value
        }

        let result = await fetch('/api/person', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: data
        });

        console.log(result)
        console.log(data)
    }



    render() {
        return (
            <div>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="Åke" ref={this.firstName} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Torsson" ref={this.lastName} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="åke.torsson.cool@gmail.com" ref={this.email} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="number" placeholder="123-456789" ref={this.phoneNumber} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" placeholder="Sweden" ref={this.country} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Lund" ref={this.city} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Timezone</Form.Label>
                        <Form.Control as="select" ref={this.timezone} >
                            <option>Europe/Oslo</option>
                            <option>Africa/Accra</option>
                            <option>America/New_York</option>
                            <option>Asia/Chongqing</option>
                            <option>America/Montreal</option>
                        </Form.Control>
                    </Form.Group>
                    <Button onClick={() => this.dataCheck()} variant="primary">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
