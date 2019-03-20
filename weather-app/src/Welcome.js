import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import Main from './Main';
import SimpleMenu from './SimpleMenu';
import { Menu } from '@material-ui/core';

class Welcome extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    }

    responseFacebook = response => {
        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        })
    }

    componentClicked = () => console.log("clicked");
    
    render() {

        let fbContent;

        if(this.state.isLoggedIn){
            fbContent = (
                <div style={{
                    width: '800px',
                    margin: 'auto',
                    padding: '20px'
                }}>
                    <img src={this.state.picture} alt={this.state.name} />
                    <h2>Welcome, {this.state.name}!</h2>
                    <Main />
                    <SimpleMenu />
                </div>
            );
        } else {
            fbContent = (<FacebookLogin
                appId="442655763138851"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />
            );
        }

        return (
            <div>
                {fbContent}
            </div>
        );
    }
}

export default Welcome;