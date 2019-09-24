import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import GeoData from '../utilities/GeoData.json'
import InputRange from 'react-input-range';


export default class AddFriend extends Component {

    state = {
        validated: false,
        country: '',
        uniqueCities: [],
        workValue: { min: 0, max: 23 },
        sleepValue: { min: 0, max: 23 },
        selectedTimezone: []
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
        this.workTime = React.createRef();
        this.sleepStart = React.createRef();
        this.sleepEnd = React.createRef();
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        if(event.target.value !== "Select a country"){
            this.setState({ country: event.target.value })

            setTimeout(() => {
                let uniqueCities = []
                uniqueCities = [...new Set(GeoData[this.state.country])]
                this.setState({ uniqueCities })

            }, 10)
            this.getTimezones(event.target.value)
        } else {
            this.setState({uniqueCities: [], selectedTimezone: []})
        }   
    }

    async getTimezones(country) {
        let data = await (await fetch("/api/timezones/" + country)).json()
        this.setState({ selectedTimezone: data })
        console.log(this.state.selectedTimezone.timezones)
    }

    async dataCheck() {

        let longLat = await (await fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+ this.city.current.value +'+'+this.country.current.value+ '&key=AIzaSyB4pPsphC1Am-jN9AYwCaUZ3gYsDnSSOtE')).json();
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
            workStart: this.state.workValue.min,
            workEnd: this.state.workValue.max,
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
                        <Form.Group controlId="ValidationWork">
                            <Form.Label>Work Time</Form.Label>
                            <InputRange
                                maxValue={23}
                                minValue={0}
                                value={this.state.workValue}
                                onChange={value => this.setState({ workValue: value })} />
                        </Form.Group>
                    </div>
                    <div className="column col-12 col-md-6">
                        <Form.Group controlId="validationCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control required as="select" onChange={this.handleChange} ref={this.country} >
                                {
                                    Object.keys(GeoData).map(item =>
                                        <option key={item} >
                                            {item}
                                        </option>)
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="validationCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control required as="select" ref={this.city} >
                                {
                                    this.state.uniqueCities.length === 0 ? <option>First select your country</option> :
                                        this.state.uniqueCities.map(item =>
                                            <option key={item}>
                                                {item}
                                            </option>)
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="validationTimezone">
                            <Form.Label>Timezone</Form.Label>
                            <Form.Control required as="select" ref={this.timezone} >7
                                {
                                    this.state.selectedTimezone.timezones === undefined ? <option>First select your country</option> :
                                        this.state.selectedTimezone.timezones.map(item =>
                                            <option key={item}>
                                                {item}
                                            </option>)
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="ValidationSleep">
                            <Form.Label>Sleep Start</Form.Label>
                            <Form.Control required as="select" ref={this.sleepStart} >
                                <option>00:00</option>
                                <option>01:00</option>
                                <option>02:00</option>
                                <option>03:00</option>
                                <option>04:00</option>
                                <option>05:00</option>
                                <option>06:00</option>
                                <option>07:00</option>
                                <option>08:00</option>
                                <option>09:00</option>
                                <option>10:00</option>
                                <option>11:00</option>
                                <option>12:00</option>
                                <option>13:00</option>
                                <option>14:00</option>
                                <option>15:00</option>
                                <option>16:00</option>
                                <option>17:00</option>
                                <option>18:00</option>
                                <option>19:00</option>
                                <option>20:00</option>
                                <option>21:00</option>
                                <option>22:00</option>
                                <option>23:00</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="ValidationSleep">
                            <Form.Label>Sleep End</Form.Label>
                            <Form.Control required as="select" ref={this.sleepEnd} >
                                <option>00:00</option>
                                <option>01:00</option>
                                <option>02:00</option>
                                <option>03:00</option>
                                <option>04:00</option>
                                <option>05:00</option>
                                <option>06:00</option>
                                <option>07:00</option>
                                <option>08:00</option>
                                <option>09:00</option>
                                <option>10:00</option>
                                <option>11:00</option>
                                <option>12:00</option>
                                <option>13:00</option>
                                <option>14:00</option>
                                <option>15:00</option>
                                <option>16:00</option>
                                <option>17:00</option>
                                <option>18:00</option>
                                <option>19:00</option>
                                <option>20:00</option>
                                <option>21:00</option>
                                <option>22:00</option>
                                <option>23:00</option>
                            </Form.Control>
                        </Form.Group>

                    </div>
                </Form>
                    <Button className="mt-4" onClick={this.handleSubmit} type="submit" variant="primary">
                            Submit
                    </Button>
            </div>
        )
    }
}
