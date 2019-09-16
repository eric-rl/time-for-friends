import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'
import CardGroup from 'react-bootstrap/CardGroup'

export default class FriendCard extends Component {

    componentDidMount(){
        
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
                    <Card.Img variant="top" alt="Hej" src={`https://robohash.org/${this.props._id}?size=200x200`}  />
                    <Card.Body>
                        <Card.Title>{this.props.name.firstName} {this.props.name.lastName}</Card.Title>
                        <Card.Text>{this.props.location.country}</Card.Text>
                        
                    </Card.Body>
                </Link>
                </Card>
                </CardGroup>
            </div>
        )
    }
}