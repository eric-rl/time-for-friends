import React, { Component } from 'react'
import Moment from 'moment-timezone/builds/moment-timezone-with-data';

export default class Available extends Component {

    state = {
        available: ''
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    componentDidMount() {
        this._isMounted = true;
        this.updateAvailable();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async updateAvailable() {
        const { workStart, workEnd, sleepStart, sleepEnd, timeZone } = this.props.availableData;
        while (this._isMounted) {
            let time = Moment.tz(new Date(Date.now()), timeZone).format("HH:mm");
            this.setState({ available: 'free' })
            if (workStart < workEnd) {
                if (time >= workStart && time < workEnd) {
                    this.setState({ available: 'work' })
                }
            } else if (workStart > workEnd) {
                if (time >= workStart || time < workEnd) {
                    this.setState({ available: 'work' })
                }
            }
            if (sleepStart < sleepEnd) {
                if (time >= sleepStart && time < sleepEnd) {
                    this.setState({ available: 'sleep' })
                }
            } else if (sleepStart > sleepEnd) {
                if (time >= sleepStart || time < sleepEnd) {
                    this.setState({ available: 'sleep' })
                }
            }
            await this.sleep(1000);
        }

    }

    render() {

        const getEmoji = () => {

            switch (this.state.available) {
                case 'work':
                    return '👨‍💻'

                case 'sleep':
                    return '😴'

                case 'free':
                    return '😎'

                default:
                    return ''
            }

        }

        return (
            <div>

                <span className="emoji-size" >
                    {getEmoji()}
                </span>
            </div>
        )
    }
}
