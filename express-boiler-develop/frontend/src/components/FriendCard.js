import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import CardGroup from 'react-bootstrap/CardGroup'
import Clock from './Clock.js'
import Available from './Available.js'


export default class FriendCard extends Component {

    componentDidMount() {

    }

    render() {
        let friendLink = "/friends/" + this.props._id;

        return (
            <div className='br3 ma2 dib bw2 shadow-5'>
                <CardGroup>
                    <Card style={{ width: '13rem' }} className="over-lay">
                        <Link to={{
                            pathname: friendLink,
                            friendData: {
                                friend: this.props
                            }
                        }}>
                            <Available availableData={{ 
                                    workStart: this.props.workStart, 
                                    workEnd: this.props.workEnd, 
                                    sleepStart: this.props.sleepStart, 
                                    sleepEnd: this.props.sleepEnd,
                                    timeZone: this.props.location.timezone}}></Available>
                            <Card.Img variant="top" alt="Hej" src={`https://robohash.org/${this.props._id}?size=200x200`} />
                            <Card.Body>
                                <Card.Title className="digital-font">{this.props.name.firstName} {this.props.name.lastName}</Card.Title>
                                <Card.Text className="digital-font">{this.props.location.country}</Card.Text>
                                <Clock timeZone={this.props.location.timezone}></Clock>
                                
                            </Card.Body>

                        </Link>
                    </Card>
                </CardGroup>
            </div>
        )
    }
}