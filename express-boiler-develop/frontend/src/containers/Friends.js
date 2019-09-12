import React, { Component } from 'react'



export default class Friends extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        this.getData();
    }
    async getData() {
        let data = await (await fetch("http://localhost:3000/api/person")).json()
        this.setState({data: data})
        console.log(this.state.data);
    }   

    render() {
        return (
            <div>
                <h1>MY FRIENDS</h1>
            </div>
        )
    }
}

