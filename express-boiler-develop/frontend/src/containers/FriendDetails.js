import React, { Component } from 'react'
import { Jumbotron, Image } from 'react-bootstrap';
import Clock from '../components/Clock.js'


export default class FriendDetails extends Component {

    state = {
        friend: {},
        loading: true
    }

    componentDidMount() {
        this.getFriend()
    }

    async getFriend() {
        let result = await (await fetch("/api/person/" + this.props.match.params.id)).json();
        this.setState({ friend: result, loading: false })
    }
    render() {

        return (
            <div>
                {this.state.loading ? <h1> </h1> : <Jumbotron className="col-8 offset-2 flex justify-center row">
                    <h1 className="col-12 tc">Hello, {this.state.friend.name.firstName}</h1>
                    <div className="column col-6 tc">
                        <p>
                            Timezone: {this.state.friend.location.timezone}
                        </p>
                        <p>
                            Country: {this.state.friend.location.country}
                        </p>
                        <p>
                            City: {this.state.friend.location.city}
                        </p>
                    </div>
                    <div className="column col-6 tc">
                        <p>
                            Phone Number: {this.state.friend.phoneNumber}
                        </p>
                        <p>
                            Email: {this.state.friend.email}
                        </p>
                    </div>
                    <div className="column col-6 flex justify-center align-items-center">
                        <Clock timeZone={this.state.friend.location.timezone}></Clock></div>
                    <div className="column col-6 flex justify-center align-items-center">
                        <Image src={`https://robohash.org/${this.state.friend._id}?size=200x200`} />
                    </div>
                </Jumbotron>}
            </div>
        )
    }
}
