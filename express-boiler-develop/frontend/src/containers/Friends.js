import React, { Component } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import FriendCard from '../components/FriendCard';
// import store from '../utilities/Store';


export default class Friends extends Component {
    state = {
        data: [],
        search: ''
    }
    
    handleChange = e => {
        this.setState({ search: e.target.value })
    }

    componentDidMount() {
        this.getData();

        // this.storeSubscriber = function (changes, store) {
        //     console.log("I am the App. I see that this happend in store", changes);
        // }
        // store.subscribeToChanges(this.storeSubscriber)
    }
    async getData() {
        let data = await (await fetch("/api/person")).json()
        this.setState({ data: data.sort((a,b) => a.name.firstName.localeCompare(b.name.firstName))})
    }


    render() {
        const filteredData = this.state.data.filter(friend =>
            friend.name.firstName.toLowerCase().startsWith(this.state.search));
        return (
            <div>
                <InputGroup size="sm" className="mb-3">
                    <FormControl onChange={this.handleChange} aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
                {
                    filteredData.sort().map(item => <FriendCard key={item._id}{...item}>
                    </FriendCard>)
                }
            </div>
        )
    }
}

