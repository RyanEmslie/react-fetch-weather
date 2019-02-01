import React, { Component } from "react";
import CardsList from "./components/CardsList";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import API from "./config";

class App extends Component {
	// initialize state
	state = {
		weatherData: [],
		ipData: [],
		ipIsLoaded: false,
		weatherIsLoaded: false
	};

	// FETCH methods called when component mounts
	componentDidMount() {
		console.log(`App component - Did Mount`);
		this.getIpData();
		this.getWeatherData();
	} // end componentDidMount

	//FETCH Open Weather API based on Lat - Long
	getWeatherData = async () => {
		let url = "http://api.openweathermap.org/data/2.5/forecast";
		let latLng = "?lat=29.6822263&lon=-82.3456736";
		let key = API;

		let res = await fetch(`${url}${latLng}&cnt=12&units=imperial${key}`);
		let weatherData = await res.json();
		this.setState({ weatherData, weatherIsLoaded: true });
		console.log("Weather Fetch - Set State");
	};

	// Fetch IP info API
	getIpData = async () => {
		let res = await fetch("https://ipapi.co/json");
		let ipData = await res.json();
		this.setState({ ipData, ipIsLoaded: true });
		console.log("IPAPI Fetch - Set State");
	};

	render() {
		console.log(this.state.ipData, this.state.weatherData);
		if (this.state.ipIsLoaded === true && this.state.weatherIsLoaded === true) {
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
