import React, { Component } from 'react'
import Weather from './Weather';

const WEATHER_API_KEY = "9d5b33bcb82b36a3a7502cb8d09a3921";

class Main extends Component {
    
    state = {
        temperature: '',
        city: '',
        country: '',
        humidity: '',
        description: '',
        error: ''
    }

    GetWeather = async () => {
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Singapore&appid=${WEATHER_API_KEY}&units=metric`);
        const data = await api_call.json();

        console.log(data);

        this.setState({
            temperature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            description: data.weather[0].description
        })
    }

    convertToMoment = () => {
        console.log(new Date('2019-03-11').getTime() / 1000);
    }

    componentDidMount(){
        this.GetWeather();
        this.convertToMoment();
    }

    render() {
        return (
            <div>
                <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}/>
            </div>
        )
    }
}

export default Main;