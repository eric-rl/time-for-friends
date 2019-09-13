import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

export default class AddFriend extends Component {

    dataCheck() {
        console.log("i dataCheck");
    }

    componentDidUpdate(){
        console.log(this.inputName.value);
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="Åke" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Torsson" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="åke.torsson.cool@gmail.com" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="number" placeholder="123-456789" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" placeholder="Sweden" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Lund" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Timezone</Form.Label>
                        <Form.Control as="select">
                            <option>Europe/Oslo</option>
                            <option>Africa/Accra</option>
                            <option>America/New_York</option>
                            <option>Asia/Chongqing</option>
                            <option>America/Montreal</option>
                        </Form.Control>
                    </Form.Group>
                    <Button onClick={this.dataCheck} variant="primary">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
