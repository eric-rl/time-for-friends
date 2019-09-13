import React, { Component } from 'react'


export default class FriendDetails extends Component {

    state = {
        friend: {}
    }

    componentDidMount() {
        this.getFriend()
    }

    async getFriend() {
        let result = await (await fetch("/api/person/" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1))).json();
        this.setState({ friend: result })
        console.log(this.state.friend.name.firstName);
    }
    render() {
        const data = this.state.friend;
        console.log(data)
        // console.log(this.state.friend)


        return (
            <div>
                {/* <p>{data.name.firstName}</p> */}
            </div>
        )
    }
}
