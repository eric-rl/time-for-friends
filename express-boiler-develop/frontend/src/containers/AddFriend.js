import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

export default class AddFriend extends Component {

    state = {
        validated: false
    }

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
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        let id = await result.json()
        await this.props.history.push('/friends/'+id._id)
    }



    handleSubmit = event => {
        const form = event.currentTarget;
        console.log(form.checkValidity());
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ validated: true });
        } else {
            event.preventDefault();
            this.dataCheck();
        }
        console.log(this.state.validated)
    };


    render() {




        return (
            <div className="justify-center tc">
                <h1 className='f1'>Add friend</h1>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit} className="flex row col-12 col-sm-8 offset-sm-2">
                    <div className="column col-12 col-md-6 col-12">
                        <Form.Group controlId="validationFirstname">
                            <Form.Label>First name</Form.Label>
                            <Form.Control required type="text" placeholder="Åke" ref={this.firstName} />
                            <Form.Control.Feedback type="invalid">
                                Please enter your first name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationLastname">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control required type="text" placeholder="Torsson" ref={this.lastName} />
                            <Form.Control.Feedback type="invalid">
                                Please enter your last name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="email" placeholder="åke.torsson.cool@gmail.com" ref={this.email} />
                            <Form.Control.Feedback type="invalid">
                                Enter valid email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationPhonenumber">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control required type="number" placeholder="123-456789" ref={this.phoneNumber} />
                            <Form.Control.Feedback type="invalid">
                                Enter your phone number.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div className="column col-12 col-md-6">
                        <Form.Group controlId="validationCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control required type="text" placeholder="Sweden" ref={this.country} />
                            <Form.Control.Feedback type="invalid">
                                Please enter your country.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control required type="text" placeholder="Lund" ref={this.city} />
                            <Form.Control.Feedback type="invalid">
                                Please enter your city.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationTimezone">
                            <Form.Label>Timezone</Form.Label>
                            <Form.Control required as="select" ref={this.timezone} >
                                <option>Europe/Oslo</option>
                                <option>Africa/Accra</option>
                                <option>America/New_York</option>
                                <option>Asia/Chongqing</option>
                                <option>America/Montreal</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
