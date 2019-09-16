import React, { Component } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import FriendCard from '../components/FriendCard';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
// import store from '../utilities/Store';


export default class Friends extends Component {
    state = {
        data: [],
        search: '',
        rangeValue: { min: 0, max: 23 }
    }

    handleChange = e => {
        this.setState({ search: e.target.value.toLowerCase() })
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
        this.setState({ data: data.sort((a, b) => a.name.firstName.localeCompare(b.name.firstName)) })
    }


    render() {
        const filteredData = this.state.data.filter(friend =>
            friend.name.firstName.toLowerCase().startsWith(this.state.search));
            console.log(this.state.rangeValue)
        return (
            <div className="col-10 offset-1">
                <hr />
                <h1 className='f1 tc'>My Friends</h1>
                <InputGroup size="lg" className="col-5 offset-2 " >
                    <FormControl placeholder="Search..." onChange={this.handleChange} aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
                <InputRange
                    maxValue={23}
                    minValue={0}
                    value={this.state.rangeValue}
                    onChange={value => this.setState({ rangeValue: value })} />
                <div className="tc" >
                    {
                        filteredData.sort().map(item => <FriendCard className="friend-card" key={item._id}{...item}>
                        </FriendCard>)
                    }
                </div>
            </div>
        )
    }
}

