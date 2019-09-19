import React, { Component } from 'react'


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
                {this.state.loading ? <h1> </h1> : <h1>{this.state.friend.name.firstName}</h1> }
            </div>
        )
    }
}
