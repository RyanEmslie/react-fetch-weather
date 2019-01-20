import React, { Component } from "react";

import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";
import { Row, Col, Jumbotron } from "reactstrap";

import "bootstrap/dist/css/bootstrap.css";

class Cards extends Component {
    render() {
        console.log("Render Cards Component");
        console.log(
            `State at time of rendering of CARD`,
            this.props.weatherData,
            this.props.ipData
        );
        let cardInfoPush = [];
        for (let i = 0; i < 12; i++) {
            cardInfoPush.push({
                id: i + 1,
                dt: this.props.weatherData[i] && this.props.weatherData[i].dt,
                temp: this.props.weatherData[i].main.temp,
                city: this.props.ipData.city,
                region: this.props.ipData.region,
                offset: this.props.ipData.utc_offset,
                main: this.props.weatherData[i].weather[0].main,
                icon: this.props.weatherData[i].weather[0].icon,
                url: `https://openweathermap.org/img/w/${
                    this.props.weatherData[i].weather[0].icon
                }.png`,
                description: this.props.weatherData[i].weather[0].description
            });
        } // end for loop

        // Create array - maps cardInfoPush
        // creates reactstrap JSX components
        let cards = [];
        cards = cardInfoPush.map(card => (
            <Col xs="auto" key={card.id}>
                <Card>
                    <CardTitle>
                        {new Date(card.dt * 1000).toLocaleString()}
                    </CardTitle>
                    <CardImg
                        top
                        width="100%"
                        src={card.url}
                        alt="Card image cap"
                    />
                    <CardBody>
                        <CardTitle>{Math.ceil(card.temp)}° F</CardTitle>
                        <CardSubtitle>
                            {card.main} -{card.description}
                        </CardSubtitle>
                        <CardSubtitle>
                            {card.city}, {card.region}
                        </CardSubtitle>
                    </CardBody>
                </Card>
            </Col>
        ));

        //Divides the cards array into equal parts
        //for inserting into different rows
        const firstRowCards = cards.filter(card => card.key < 7);
        const secondRowCards = cards.filter(card => card.key > 6);

        //! Needs work
        // Lazy approach to ensuring undefined object values are not rendered
        // async await?
        if (
            cardInfoPush[0].url !== "undefined" ||
            cardInfoPush[0].offset !== "undefined"
        ) {
            return (
                <div>
                    <Jumbotron>
                        {this.props.ipData.city}'s 12 Hour Forcast
                    </Jumbotron>
                    <Row>{firstRowCards}</Row>
                    <Row>{secondRowCards}</Row>
                </div>
            );
        } else {
            return <p>Still Loading</p>;
        }
    }
}

export default Cards;
