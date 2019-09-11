import React, { Component } from 'react'
async function test(){
    let data = await (await fetch("http://localhost:3001/api/person")).json()
    console.log(data[0]);
    
}
    
class Friends extends Component {
    componentDidMount() {
        test();

    }
    
    render() {
        return (
            <div>
                <h1>MY FRIENDS</h1>
            </div>
        )
    }
}

export default Friends;
