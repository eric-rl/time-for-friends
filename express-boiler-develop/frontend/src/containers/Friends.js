import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import FriendCard from '../components/FriendCard';
import InputRange from 'react-input-range';
import Moment from 'moment-timezone/builds/moment-timezone-with-data'
import { Store } from '../utilities/Store'
import 'react-input-range/lib/css/index.css'
import '../css/search.css'



export default function Friends(props) {

    const { state, dispatch } = React.useContext(Store);
    const [search, setSearch] = useState('')
    const [rangeValue, setRangeValue] = useState({ min: 0, max: 23 })
    const [sortValue, setSortValue] = useState(1)
    const [sortedAndFilteredData, setSortedAndFilteredData] = useState([])

    // eslint-disable-next-line
    useEffect(() => {
        state.friends.length === 0 && fetchDataAction();
        setSortedAndFilteredData(state.friends.sort((a, b) => a.name.firstName.localeCompare(b.name.firstName)))
    });

    function handleChange(e) {
        setSearch(e.target.value.toLowerCase())
    }

    function handleToggleChange(e) {
        setSortValue(e)
        sortFriends(e)
    }

    const fetchDataAction = async () => {
        const data = await fetch("/api/person/"+state.currentUser.id);
        const dataJSON = await data.json();
        return dispatch({
            type: 'FETCH_DATA',
            payload: dataJSON
        });
    };

    function sortFriends(e) {
        switch (e) {
            case 1:
                setSortedAndFilteredData(sortedAndFilteredData.sort((a, b) => a.name.firstName.localeCompare(b.name.firstName)))
                break;
            case 2:
                setSortedAndFilteredData(sortedAndFilteredData.sort((a, b) => a.name.lastName.localeCompare(b.name.lastName)))
                break;
            case 3:
                setSortedAndFilteredData(sortedAndFilteredData.sort((a, b) => a.location.timezone.localeCompare(b.location.timezone)))
                break;
            default:
                return
        }
    }

    const filteredData = sortedAndFilteredData.filter(friend =>
        (friend.name.firstName.toLowerCase().startsWith(search) ||
            friend.name.lastName.toLowerCase().startsWith(search)) &&
        Moment.tz(new Date(), friend.location.timezone).format("HH") >= rangeValue.min &&
        Moment.tz(new Date(), friend.location.timezone).format("HH") < rangeValue.max);

    return (
        <div className="col-12 col-sm-10 offset-sm-1 mb-5 p-0">
            <h1 className='f1 tc'>My Friends</h1>
            <div className="col-12 col-md-10 offset-md-1">
                <div className="d-flex row justify-content-around">
                    <InputGroup size="md" className="col-11 col-lg-6 p-0" >
                        <FormControl placeholder="Search..." onKeyUp={handleChange} aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                    <ToggleButtonGroup name="hej" className="col-11 col-lg-5 p-0 mt-3 mt-lg-0" type="radio" value={sortValue} onChange={handleToggleChange}>
                        <ToggleButton value={1}>First name</ToggleButton>
                        <ToggleButton value={2}>Last name</ToggleButton>
                        <ToggleButton value={3}>Timezone</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <InputRange
                    maxValue={23}
                    minValue={0}
                    value={rangeValue}
                    onChange={value => setRangeValue(value)} />
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

