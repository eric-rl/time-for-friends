import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'

export default class FriendCard extends Component {

    componentDidMount(){
        
    }
    
    render() {
        let friendLink = "/friends/" + this.props._id;
        
        return (
            <div>
                <Card style={{ width: '18rem' }} >
                <Link to={{
                    pathname: friendLink,
                    friendData: {
                        friend: this.props
                    }
                }}>
                    <Card.Img variant="top"  />
                    <Card.Body>
                        <Card.Title>{this.props.name.firstName} {this.props.name.lastName}</Card.Title>
                        <Card.Text>{this.props.location.country}</Card.Text>
                        <Button onClick={this.routeToFriend} variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Link>
                </Card>
            </div>
        )
    }
}