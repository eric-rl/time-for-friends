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
        data: [],
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
        this.setState({ sortValue: e })
        this.sortFriends()
    }

    async componentDidMount() {
        await this.getData();
        this.setState({ sortedAndFilteredData: this.state.sortedAndFilteredData.sort((a, b) => a.name.firstName.localeCompare(b.name.firstName)) })
    }

    async getData() {
        let sortedAndFilteredData = await (await fetch("/api/person")).json()
        this.setState({ sortedAndFilteredData })
    }

    sortFriends() {
        console.log(this.state.sortValue);
        switch (this.state.sortValue) {
            case 1:
                return this.setState({ sortedAndFilteredData : this.state.sortedAndFilteredData.sort((a, b) => a.name.firstName.localeCompare(b.name.firstName)) })
            case 2:
                return this.setState({ sortedAndFilteredData : this.state.sortedAndFilteredData.sort((a, b) => a.name.lastName.localeCompare(b.name.lastName)) })
            case 3:
                return this.setState({ sortedAndFilteredData : this.state.sortedAndFilteredData.sort((a, b) => a.location.timezone.localeCompare(b.location.timezone)) })
            default:
                return
        }
    }

    filterFriends() {
        const filteredData = this.state.sortedAndFilteredData.filter(friend =>
            (friend.name.firstName.toLowerCase().startsWith(this.state.search) ||
                friend.name.lastName.toLowerCase().startsWith(this.state.search)) &&
            Moment.tz(new Date(), friend.location.timezone).format("HH") >= this.state.rangeValue.min &&
            Moment.tz(new Date(), friend.location.timezone).format("HH") < this.state.rangeValue.max);

            this.setState({ sortedAndFilteredData : filteredData })
    }

    render() {
        console.log("sortedandfilterd", this.state.sortedAndFilteredData);
        console.log('sortvalue', this.state.sortValue);

        // this.state.sortByFirstName ?
        //     this.state.data.sort((a, b) => a.name.firstName.localeCompare(b.name.firstName)) :
        //     this.state.data.sort((a, b) => a.name.lastName.localeCompare(b.name.lastName))

        return (
            <div className="col-12 col-sm-10 offset-sm-1">
                <h1 className='f1 tc'>My Friends</h1>
                <div className="col-10 offset-1">
                    <div className="d-flex row justify-content-around">
                        <InputGroup size="md" className="col-12 col-sm-4 p-0" >
                            <FormControl placeholder="Search..." onKeyUp={this.handleChange} aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                        </InputGroup>
                        {/* <Button onClick={this.sortByTimezone}>Sort Timezone</Button> */}
                        {/* <BootstrapSwitchButton
                            checked={true}
                            onlabel='First Name'
                            onstyle='success'
                            offlabel='Last Name'
                            offstyle='danger'
                            style={'col-12 col-sm-4'}
                            onChange={(checked) => {
                                this.setState({ sortByFirstName: checked })
                            }}
                        /> */}
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
                        this.state.sortedAndFilteredData.map(item => <FriendCard className="friend-card" key={item._id}{...item}>
                        </FriendCard>)
                    }
                </div>
            </div>
        )
    }
}

