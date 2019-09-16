import React, { Component } from 'react';
import Moment from 'moment-timezone/builds/moment-timezone-with-data';


export default class Clock extends Component {

    state = {
        time: Moment.tz(new Date(), this.props.timeZone).format("HH:mm:ss")
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    componentDidMount() {
        this._isMounted = true;
        this.updateClock();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async updateClock() {
        while (this._isMounted) {
            this.setState({ time: Moment.tz(new Date(Date.now()), this.props.timeZone).format("HH:mm:ss") });
            await this.sleep(500);
        }

    }

    render() {
        return (
            <>
                <h2>{this.state.time}</h2>
            </>
        );
    }



}