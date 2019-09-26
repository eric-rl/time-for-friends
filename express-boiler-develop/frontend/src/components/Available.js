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
        console.log('sleepStart: ', sleepStart);
        console.log('sleepEnd: ', sleepEnd)
        console.log('worrkStart: ', workStart)
        console.log('workEnd: ', workEnd)
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





            // if (time >= workStart && time < workEnd) {
            //     this.setState({ available: 'work' })
            // }else if (time >= sleepStart && time < sleepEnd) {
            //     console.log('Sleeping before 00:00', sleepStart, sleepEnd)
            //     this.setState({ available: 'sleep' })
            // } else if (time > '00:00' && time < sleepEnd) {
            //     console.log('sleeping after 00:00')
            //     this.setState({ available: 'sleep' })

            // } else {
            //     this.setState({ available: 'free' })
            // }
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


        // console.log(this.state.available);
        return (
            <div>

                <span className="emoji-size" >
                    {getEmoji()}
                </span>
            </div>
        )
    }
}
