import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import GeoData from '../utilities/GeoData.json'


export default class AddFriend extends Component {
    hours = [
        '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00',
        '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30',
        '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00',
        '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
        '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
        '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
    ]
    state = {
        validated: false,
        country: '',
        uniqueCities: [],
        selectedTimezone: [],
        sleepWorkError: false
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
        this.workStart = React.createRef();
        this.workEnd = React.createRef();
        this.sleepStart = React.createRef();
        this.sleepEnd = React.createRef();
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        if (event.target.value !== "Select a country") {
            this.setState({ country: event.target.value })

            setTimeout(() => {
                let uniqueCities = []
                uniqueCities = [...new Set(GeoData[this.state.country])]
                this.setState({ uniqueCities })

            }, 10)
            this.getTimezones(event.target.value)
        } else {
            this.setState({ uniqueCities: [], selectedTimezone: [] })
        }
    }

    async getTimezones(country) {
        let data = await (await fetch("/api/timezones/" + country)).json()
        this.setState({ selectedTimezone: data })
        console.log(this.state.selectedTimezone.timezones)
    }

    async dataCheck() {
        if (this.country.current.value !== "Select a country") {

            let longLat = await (await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.city.current.value + '+' + this.country.current.value + '&key=AIzaSyB4pPsphC1Am-jN9AYwCaUZ3gYsDnSSOtE')).json();
            console.log(longLat.results[0].geometry.location)
            let data = {
                name: {
                    firstName: this.firstName.current.value,
                    lastName: this.lastName.current.value
                },
                location: {
                    timezone: this.timezone.current.value,
                    country: this.country.current.value,
                    city: this.city.current.value,
                    lng: longLat.results[0].geometry.location.lng,
                    lat: longLat.results[0].geometry.location.lat
                },
                email: this.email.current.value,
                phoneNumber: this.phoneNumber.current.value,
                workStart: this.workStart.current.value,
                workEnd: this.workEnd.current.value,
                sleepStart: this.sleepStart.current.value,
                sleepEnd: this.sleepEnd.current.value,
            }

            let result = await fetch('/api/person', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            let id = await result.json()
            await this.props.history.push('/friends/' + id._id)
        }
    }



    handleSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ validated: true });
        }
        else if (this.workEnd.current.value > this.sleepStart.current.value || this.workStart.current.value < this.sleepEnd.current.value) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ validated: true });
            this.setState({ sleepWorkError: true })
        } else {
            event.preventDefault();
            this.dataCheck();
        }
        event.preventDefault();
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
                        <Form.Group controlId="ValidationWork">
                            <Form.Label>Work Start</Form.Label>
                            <Form.Control required as="select" ref={this.workStart} >
                                {this.hours.map(item =>
                                    <option key={item}>{item}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="ValidationWork">
                            <Form.Label>Work End</Form.Label>
                            <Form.Control required as="select" ref={this.workEnd} >
                                {this.hours.map(item =>
                                    <option key={item}>{item}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="column col-12 col-md-6">
                        <Form.Group controlId="validationCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control required as="select" onChange={this.handleChange} ref={this.country} >
                                {
                                    Object.keys(GeoData).map(item =>
                                        <option key={item}>
                                            {item}
                                        </option>)
                                }
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please select your country.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control required as="select" ref={this.city} >
                                {
                                    this.state.uniqueCities.length === 0 ? <option value="">First select your country</option> :
                                        this.state.uniqueCities.map(item =>
                                            <option key={item}>
                                                {item}
                                            </option>)
                                }
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please select your city.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationTimezone">
                            <Form.Label>Timezone</Form.Label>
                            <Form.Control required as="select" ref={this.timezone} >7
                                {
                                    this.state.selectedTimezone.timezones === undefined ? <option value="">First select your country</option> :
                                        this.state.selectedTimezone.timezones.map(item =>
                                            <option key={item}>
                                                {item}
                                            </option>)
                                }
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please select your timezone.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="ValidationSleep">
                            <Form.Label>Sleep Start</Form.Label>
                            <Form.Control required as="select" ref={this.sleepStart} >
                                {this.hours.map(item =>
                                    <option key={item}>{item}</option>)}
                            </Form.Control>
                        </Form.Group>
                        {
                            this.state.sleepError === true && <p>Your sleep start must occur before your sleep end</p>
                        }
                        <Form.Group controlId="ValidationSleep">
                            <Form.Label>Sleep End</Form.Label>
                            <Form.Control required as="select" ref={this.sleepEnd} >
                                {this.hours.map(item =>
                                    <option key={item}>{item}</option>)}
                            </Form.Control>
                        </Form.Group>
                        {
                            this.state.sleepWorkError === true && <p className="warningSleep">Your cant work and sleep at the same time... Damn u lazy</p>
                        }
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
