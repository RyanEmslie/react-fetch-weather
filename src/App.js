import React, { Component } from "react";
import CardsList from "./components/CardsList";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import API from "./config";

class App extends Component {
    // initialize state
    //! is constructor needed? ES6 =>
    constructor() {
        super();
        this.state = {
            weatherData: [],
            ipData: []
        };
    }

    // FETCH methods called when component mounts
    componentDidMount() {
        console.log(`App component - Did Mount`);
        this.getIpData();
        this.getWeatherData();
    }

    // Fetch IP info API

    getIpData = () => {
        console.log("IP Fetch");
        fetch(`https://ipapi.co/json`)
            .then(response =>
                response.json().catch(err => {
                    console.err(`'${err}' happened!`);
                    return {};
                })
            )
            .then(locData => {
                this.setState({
                    ipData: locData
                });
            })
            .catch(err => {
                console.log("fetch request failed: ", err);
            });
    };

    //FETCH Open Weather API based on Lat - Long
    getWeatherData = () => {
        console.log("Weather Fetch - Set State");
        let url = "http://api.openweathermap.org/data/2.5/forecast";
        let latLng = "?lat=29.6822263&lon=-82.3456736";
        let key = API;
        fetch(`${url}${latLng}&cnt=12&units=imperial${key}`)
            .then(response =>
                response.json().catch(err => {
                    console.err(`'${err}' happened!`);
                    return {};
                })
            )
            .then(locData => {
                this.setState({
                    weatherData: locData.list
                });
            })
            .catch(err => {
                console.log("fetch request failed: ", err);
            });
    };

    render() {
        console.log("Render App Component");
        console.log(`State at begining of Render`, this.state);
        //! Needs work
        // Lazy approach to ensuring undefined object values are not rendered
        // async await?
        if (this.state.weatherData.length > 0 || this.state.ipData.length > 0) {
            return (
                <div className="App">
                    <CardsList
                        weatherData={this.state.weatherData}
                        ipData={this.state.ipData}
                    />
                </div>
            );
        } else {
            return <h1>Data is Still Loading...</h1>;
        }
    }
}

export default App;
