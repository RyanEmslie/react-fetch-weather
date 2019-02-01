import React, { Component } from "react";

import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";
import { Row, Col, Jumbotron } from "reactstrap";

import "../App.css";

class Cards extends Component {
	state = {
		cards: [],
		cardInfoPush: []
	};

	componentDidMount() {
		this.createCards();
	} // end didMount

	createCards = () => {
		let cardInfoPush = [];
		for (let i = 0; i < 12; i++) {
			cardInfoPush.push({
				id: i + 1,
				dt: this.props.weatherData.list[i] && this.props.weatherData.list[i].dt,
				temp: this.props.weatherData.list[i].main.temp,
				city: this.props.ipData.city,
				region: this.props.ipData.region,
				offset: this.props.ipData.utc_offset,
				main: this.props.weatherData.list[i].weather[0].main,
				icon: this.props.weatherData.list[i].weather[0].icon,
				url: `https://openweathermap.org/img/w/${
					this.props.weatherData.list[i].weather[0].icon
				}.png`,
				description: this.props.weatherData.list[i].weather[0].description
			});
			this.setState({ cardInfoPush });
		} // end for loop

		// Create array - maps cardInfoPush
		// creates reactstrap JSX components
		let cards = cardInfoPush.map(card => (
			<Col xs="col-2" key={card.id}>
				<div>
					<Card className="text-center">
						<CardTitle>{new Date(card.dt * 1000).toLocaleString()}</CardTitle>
						<CardImg width="100%" src={card.url} alt="Card image cap" />
						<CardBody>
							<CardTitle>{Math.ceil(card.temp)}° F</CardTitle>
							<CardSubtitle>
								{card.main} - {card.description}
							</CardSubtitle>
							<CardSubtitle>
								{card.city}, {card.region}
							</CardSubtitle>
						</CardBody>
					</Card>
				</div>
			</Col>
		));
		this.setState({ cards });
	};

	render() {
		console.log("Render Cards Component");
		console.log(
			`State at time of rendering of CARD`,
			this.props.weatherData,
			this.props.ipData
		);

		//Divides the cards array into equal parts
		//for inserting into different rows
		const firstRowCards = this.state.cards.filter(card => card.key < 7);
		const secondRowCards = this.state.cards.filter(card => card.key > 6);

		return (
			<div>
				<Jumbotron id="jumbo" className="jumbotron">
					{this.props.ipData.city}'s 36 Hour Forcast
				</Jumbotron>
				<div className="card-deck justify-content-center">
					<Row style={flexStyle} id="my-row">
						{firstRowCards}
					</Row>
					<Row
						style={flexStyle}
						className="justify-content-center"
						id="my-row2"
					>
						{secondRowCards}
					</Row>
				</div>
			</div>
		);
	}
}
const flexStyle = {
	flexWrap: "nowrap"
};
export default Cards;
