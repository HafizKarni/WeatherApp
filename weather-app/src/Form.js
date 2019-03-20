import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const WEATHER_API_KEY = "9d5b33bcb82b36a3a7502cb8d09a3921";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date()
        };
        this.handleChangeDateTo = this.handleChangeDateTo.bind(this);
        this.handleChangeDateFrom = this.handleChangeDateFrom.bind(this);       
    }

    state = {
        temperature: '',
        city: '',
        country: '',
        humidity: '',
        description: '',
        error: ''
    }

    GetWeather2 = async (e) => {
        e.preventDefault();
        
        const dateFrom = moment(this.state.startDate).format("YYYY-MM-DD");
        console.log("dateFrom: " + dateFrom);
        const dateTo = moment(this.state.endDate).format("YYYY-MM-DD");
        console.log("dateTo: " + dateTo);

        var dra = require('date-range-array');
        var dates = dra(dateFrom, dateTo);
        console.log('dates', dates);
        console.log('no of dates: ' + dates.length);

        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Singapore&appid=${WEATHER_API_KEY}&units=metric`);
        const data = await api_call.json();


        this.setState({
            temperature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            description: data.weather[0].description
        })
    }

    handleChangeDateFrom(date) {
        this.setState({
            startDate: date
        });
    }

    handleChangeDateTo(date) {
        this.setState({
            endDate: date
        })
    }

    render() {
        return (
            <form onSubmit={this.GetWeather2}>
                <DatePicker name="dateFrom"
                    selected={this.state.startDate}
                    onChange={this.handleChangeDateFrom}
                    dateFormat="YYYY-MM-dd"
                />

                <DatePicker name="dateTo"
                    selected={this.state.endDate}
                    onChange={this.handleChangeDateTo}
                    dateFormat="YYYY-MM-dd"
                />
                <button>
                    Get Weather
                </button>
            </form>
        )
    }
}

export default Form;