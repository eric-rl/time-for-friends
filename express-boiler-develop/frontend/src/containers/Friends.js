import React, { Component } from 'react';
import { InputGroup, FormControl, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import FriendCard from '../components/FriendCard';
import InputRange from 'react-input-range';
import Moment from 'moment-timezone/builds/moment-timezone-with-data'
import 'react-input-range/lib/css/index.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import '../css/search.css'
// import store from '../utilities/Store';


export default class Friends extends Component {

    state = {
        search: '',
        rangeValue: { min: 0, max: 23 },
        sortByFirstName: true,
        sortValue: 1,
        sortedAndFilteredData: []
    }

    handleChange = e => {
        this.setState({ search: e.target.value.toLowerCase() })
    }

    handleToggleChange = e => {
        console.log('e i handleToggleChange', e);
        this.setState({ sortValue: e })
        setTimeout(() => {
            console.log('i timout', this.state.sortValue)

        }, 100)
        console.log('sortValue i handleChange', this.state.sortValue);
        this.sortFriends(e)
    }

    async componentDidMount() {
        await this.getData();
        this.setState({ sortedAndFilteredData: this.state.sortedAndFilteredData.sort((a, b) => a.name.firstName.localeCompare(b.name.firstName)) })
    }

    async getData() {
        let sortedAndFilteredData = await (await fetch("/api/person")).json()
        this.setState({ sortedAndFilteredData })
    }

    sortFriends(e) {
        console.log('sortValue i sortFriends', e);
        switch (e) {
            case 1:
                this.setState({ sortedAndFilteredData: this.state.sortedAndFilteredData.sort((a, b) => a.name.firstName.localeCompare(b.name.firstName)) })
                break;
            case 2:
                this.setState({ sortedAndFilteredData: this.state.sortedAndFilteredData.sort((a, b) => a.name.lastName.localeCompare(b.name.lastName)) })
                break;
            case 3:
                this.setState({ sortedAndFilteredData: this.state.sortedAndFilteredData.sort((a, b) => a.location.timezone.localeCompare(b.location.timezone)) })
                break;
            default:
                return
        }
    }

    render() {
        console.log("sortedandfilterd i render", this.state.sortedAndFilteredData);
        console.log('sortvalue i render', this.state.sortValue);

        const filteredData = this.state.sortedAndFilteredData.filter(friend =>
            (friend.name.firstName.toLowerCase().startsWith(this.state.search) ||
                friend.name.lastName.toLowerCase().startsWith(this.state.search)) &&
            Moment.tz(new Date(), friend.location.timezone).format("HH") >= this.state.rangeValue.min &&
            Moment.tz(new Date(), friend.location.timezone).format("HH") < this.state.rangeValue.max);

        return (
            <div className="col-12 col-sm-10 offset-sm-1 mb-5">
                <h1 className='f1 tc'>My Friends</h1>
                <div className="col-10 offset-1">
                    <div className="d-flex row justify-content-around">
                        <InputGroup size="md" className="col-12 col-sm-4 p-0" >
                            <FormControl placeholder="Search..." onKeyUp={this.handleChange} aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                        </InputGroup>
                        <ToggleButtonGroup name="hej" type="radio" value={this.state.sortValue} onChange={this.handleToggleChange}>
                            <ToggleButton value={1}>First name</ToggleButton>
                            <ToggleButton value={2}>Last name</ToggleButton>
                            <ToggleButton value={3}>Timezone</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <InputRange
                        maxValue={23}
                        minValue={0}
                        value={this.state.rangeValue}
                        onChange={value => this.setState({ rangeValue: value })} />
                </div>
                <div className="tc" >
                    {
                        filteredData.map(item => <FriendCard className="friend-card" key={item._id}{...item}>
                        </FriendCard>)
                    }
                </div>
            </div>
        )
    }
}

