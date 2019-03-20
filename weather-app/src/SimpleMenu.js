import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Weather from './Weather';
import Form from './Form';
import Email from './Email';
import Activity from './Activity';


class SimpleMenu extends React.Component {
    
    state = {
      anchorEl: null,
      redirectForSearchWeather: false,
      redirectForSendEmail: false,
      redirectForMyActivity: false
    };

    setRedirectForSearchWeather = () => {
        this.setState({
            redirectForSearchWeather: true,
            redirectForSendEmail: false,
            redirectForMyActivity: false,
            anchorEl: null
        })
    }

    setRedirectForSendEmail = () => {
        this.setState({
            redirectForSearchWeather: false,
            redirectForSendEmail: true,
            redirectForMyActivity: false,
            anchorEl: null
        })
    }

    setRedirectForMyActivity = () => {
        this.setState({
            redirectForSearchWeather: false,
            redirectForSendEmail: false,
            redirectForMyActivity: true,
            anchorEl: null
        })
    }

    renderRedirect = () => {
        if (this.state.redirectForSearchWeather) {
            console.log('Search Weather true;');
            return <Route path="/" component={Form} />
        }
        else if(this.state.redirectForSendEmail) {
            console.log('Send Email true;');
            return <Route path="/" component={Email} />
        }
        else if(this.state.redirectForMyActivity) {
            console.log('My Activity true;');
            return <Route path="/" component={Activity} />
        }
    }
  
    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
  
    handleClose = () => {
      this.setState({ anchorEl: null });
    };
  
    render() {
        const theme = createMuiTheme({
            overrides: {
                // Name of the component
                MuiButton: {
                    // Name of the rule
                    text: {
                        // Some CSS
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        borderRadius: 3,
                        border: 0,
                        color: 'white',
                        height: 48,
                        padding: '0 30px',
                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    },
                },
            },
            typography: { useNextVariants: true },
        });
            
        const { anchorEl } = this.state;
  
        return (
            <Router>
                <div>
                    <MuiThemeProvider theme={theme}>
                        <Button
                            onClick={this.handleClick}
                        >
                            Menu
                        </Button>
                    </MuiThemeProvider>
                    {this.renderRedirect()}
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.setRedirectForSearchWeather}>Search Weather</MenuItem>
                        <MenuItem onClick={this.setRedirectForSendEmail}>Send Email</MenuItem>
                        <MenuItem onClick={this.setRedirectForMyActivity}>My Activity</MenuItem>
                    </Menu>
                </div>
            </Router>
        );
        }
  }
  
  export default SimpleMenu;