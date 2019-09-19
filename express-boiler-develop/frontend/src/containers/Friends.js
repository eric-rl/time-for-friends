import React, { Component } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import FriendCard from '../components/FriendCard';
import InputRange from 'react-input-range';
import Moment from 'moment-timezone/builds/moment-timezone-with-data'
import 'react-input-range/lib/css/index.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import '../css/search.css'
// import store from '../utilities/Store';


export default class Friends extends Component {
    state = {
        data: [],
        search: '',
        rangeValue: { min: 0, max: 23 },
        sortByFirstName: true

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
        this.setState({ data })
    }


    render() {
        this.state.sortByFirstName ? this.state.data.sort((a, b) =>
            a.name.firstName.localeCompare(b.name.firstName)) :
            this.state.data.sort((a, b) => a.name.lastName.localeCompare(b.name.lastName))

        const filteredData = this.state.data.filter(friend =>
            (friend.name.firstName.toLowerCase().startsWith(this.state.search) ||
                friend.name.lastName.toLowerCase().startsWith(this.state.search)) &&
            Moment.tz(new Date(), friend.location.timezone).format("HH") >= this.state.rangeValue.min &&
            Moment.tz(new Date(), friend.location.timezone).format("HH") <= this.state.rangeValue.max);

        return (
            <div className="col-12 col-sm-10 offset-sm-1">
                <h1 className='f1 tc'>My Friends</h1>
                <div className="col-10 offset-1">
                    <div className="d-flex row justify-content-around">
                        <InputGroup size="md" className="col-12 col-sm-4 p-0" >
                            <FormControl placeholder="Search..." onChange={this.handleChange} aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                        </InputGroup>
                        <BootstrapSwitchButton
                            checked={true}
                            onlabel='First Name'
                            onstyle='success'
                            offlabel='Last Name'
                            offstyle='danger'
                            style='col-12 col-sm-4'
                            onChange={(checked) => {
                                this.setState({ sortByFirstName: checked })
                            }}
                        />
                    </div>
                    <InputRange
                        maxValue={23}
                        minValue={0}
                        value={this.state.rangeValue}
                        onChange={value => this.setState({ rangeValue: value })} />
                </div>
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

