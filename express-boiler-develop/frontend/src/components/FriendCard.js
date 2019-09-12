import React, { Component } from 'react'
import {Card, Button} from 'react-bootstrap'

export default class FriendCard extends Component {

    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top"  />
                    <Card.Body>
                        <Card.Title>{this.props.name.firstName} {this.props.name.lastName}</Card.Title>
                        <Card.Text>{this.props.location.country}</Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
