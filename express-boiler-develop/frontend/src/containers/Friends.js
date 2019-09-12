import React, { Component } from 'react';
import {InputGroup, FormControl} from 'react-bootstrap' ;



export default class Friends extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        this.getData();
    }
    async getData() {
        let data = await (await fetch("/api/person")).json()
        this.setState({ data: data })
        console.log(this.state.data);
    }

    render() {
        return (
            <div>
                <InputGroup size="sm" className="mb-3">
                    <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
                <ul>
                    {this.state.data.map(item =>
                        <li key={item._id}>{item.name.firstName} {item.name.lastName}, {item.location.timezone}</li>
                    )}
                </ul>
            </div>
        )
    }
}

