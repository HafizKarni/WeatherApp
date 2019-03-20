import React, { Component } from 'react'

require('request');

class Weather extends Component {
    render() {
        function CurrentDate() {
            var tempDate = new Date();
            var date = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
            const currDate = date;
            return currDate;
        }

        return (
            <div>
                <p>Today's Date is <b><CurrentDate /></b> and Current Temperature is <b>{this.props.temperature} degrees</b> in <b>{this.props.city}</b>.</p>
            </div>
        )
    }
}

export default Weather;