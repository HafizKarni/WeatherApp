import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Button} from 'reactstrap';
import axios from 'axios';

const WEATHER_API_KEY = "9d5b33bcb82b36a3a7502cb8d09a3921";

class Email extends Component {
    constructor(){
        super()
        this.state = {
            firstname: '',
            lastname: '',
            date: '',
            email: '',
            message: '',
            temperature: '',
            city: '',
            country: '',
            humidity: '',
            description: '',
            error: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    GetWeather = async () => {
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

    componentDidMount(){
        this.GetWeather();
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async handleSubmit(e) {
        e.preventDefault();

        const {firstname, lastname, email} = this.state
        const date = e.target.date.value;
        const message = e.target.message.value;

        const form = await axios.post('/api/form', {
            firstname,
            lastname,
            date,
            email,
            message
        })
    }

    CurrentDate = () => {
        var tempDate = new Date();
        var date = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
        const currDate = date;
        return currDate;
    }

    render() {
        let weatherToday = `Today's temperature is ${this.state.temperature} degress in ${this.state.city} and humidity level of ${this.state.humidity}.`;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="firstname">First Name: </Label>
                    <Input 
                        type="text"
                        name="firstname"
                        onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="lastname">Last Name: </Label>
                    <Input 
                        type="text"
                        name="lastname"
                        onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email: </Label>
                    <Input 
                        type="text"
                        name="email"
                        onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="date">Date: </Label>
                    <Input 
                        type="text"
                        name="date"
                        onChange={this.handleChange} 
                        value={this.CurrentDate()}
                        readOnly="true"/>
                </FormGroup>
                <FormGroup>
                    <Label for="message">Today's Temperature: </Label>
                    <Input 
                        type="textarea"
                        name="message"
                        onChange={this.handleChange}
                        value={weatherToday} 
                        readOnly="true"/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        )
    }
}

export default Email;