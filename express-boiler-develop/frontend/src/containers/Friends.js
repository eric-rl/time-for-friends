import React, { Component, useState, useEffect } from 'react';
import { InputGroup, FormControl, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import FriendCard from '../components/FriendCard';
import InputRange from 'react-input-range';
import Moment from 'moment-timezone/builds/moment-timezone-with-data'
import { Store } from '../utilities/Store'
import 'react-input-range/lib/css/index.css'
import '../css/search.css'



export default function Friends(props) {

    const { state, dispatch } = React.useContext(Store);
    // const [search, setSearch] = useState('')
    // const [rangeValue, setRangeValue] = useState({ min: 0, max: 23 })
    // const [sortByFirstName, setSortByFirstName] = useState(true)
    // const [sortValue, setSortValue] = useState(1)
    const [sortedAndFilteredData, setSortedAndFilteredData] = useState([])

    useEffect(() => {
        state.friends.length === 0 && fetchDataAction();
    });
    
    console.log(state.friends)

    // function handleChange(e) {
    //     this.setState({ search: e.target.value.toLowerCase() })
    // }

    // function handleToggleChange(e) {
    //     this.setState({ sortValue: e })
    //     this.sortFriends(e)
    // }

    // React.useEffect(() => {
    //     setSortedAndFilteredData(state.friends)
    //     state.friends.length === 0 && fetchDataAction();
    // });

    const fetchDataAction = async () => {
        const data = await fetch("/api/person");
        const dataJSON = await data.json();
        return dispatch({
            type: 'FETCH_DATA',
            payload: dataJSON
        });
    };

    // function sortFriends(e) {
    //     switch (e) {
    //         case 1:
    //             this.setState({ sortedAndFilteredData: this.state.sortedAndFilteredData.sort((a, b) => a.name.firstName.localeCompare(b.name.firstName)) })
    //             break;
    //         case 2:
    //             this.setState({ sortedAndFilteredData: this.state.sortedAndFilteredData.sort((a, b) => a.name.lastName.localeCompare(b.name.lastName)) })
    //             break;
    //         case 3:
    //             this.setState({ sortedAndFilteredData: this.state.sortedAndFilteredData.sort((a, b) => a.location.timezone.localeCompare(b.location.timezone)) })
    //             break;
    //         default:
    //             return
    //     }
    // }

    // const filteredData = sortedAndFilteredData.filter(friend =>
    //     (friend.name.firstName.toLowerCase().startsWith(this.state.search) ||
    //         friend.name.lastName.toLowerCase().startsWith(this.state.search)) &&
    //     Moment.tz(new Date(), friend.location.timezone).format("HH") >= this.state.rangeValue.min &&
    //     Moment.tz(new Date(), friend.location.timezone).format("HH") < this.state.rangeValue.max);

    return (
        <div className="col-12 col-sm-10 offset-sm-1 mb-5">
            {/* <h1 className='f1 tc'>My Friends</h1>
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
            </div> */}
        </div>
    )

}

