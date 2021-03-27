import React, { Component } from "react";
import dayjs from 'dayjs';

export class Weather extends Component {

    constructor (props) {
        super(props);
        this.state = {
            city: 'Bordeaux',
            region: 'Nouvelle-Aquitaine',
            temp: '4',
            status: 'Clair',
            date: dayjs().format('hh:mm:ss'),
            feel: '1',
            wind: '11',
            visibility: '10',
            barometer: '1024',
            humidity: '87',
            dew: '2',
            img: null
        }
        this.timer = null;
        this.city = '3031582';
        this.unit = 'metric';
    }

    componentDidMount () {
        this.tick();
        this.timer = window.setInterval(() => {
            this.tick();
        }, (1000 * 60 * 10));
    }

    componentWillUnmount() {
        window.clearInterval(this.timer);
    }

    async tick () {
        let data = await this.fetchData();
        /* console.log(data); */
        this.setState({
            city: data.name,
            region: 'Nouvelle-Aquitaine',
            temp: Math.round(data.main.temp),
            status: data.weather[0].description,
            date: dayjs().format('hh:mm:ss'),
            feel: Math.round(data.main.feels_like),
            wind: Math.round(data.wind.speed * 10) /10,
            visibility: Math.round(data.visibility/1000),
            barometer: data.main.pressure,
            humidity: data.main.humidity,
            dew: Math.round(data.main.temp_min),
            img: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
        });
    }

    async fetchData () {
        try {
            let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?id=${this.city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&lang=fr&units=${this.unit}`)
            if (response.ok) {
                let data = await response.json();
                return data
            } else {
                console.error('Retour du serveur : ', response.status);
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className="weather-card">
                <div className="weather-card-header">
                    <h1 className="weather-card-title">{this.state.city}, {this.state.region}</h1>
                </div>
                <div className="weather-card-body">
                    <div className="weather-card-main">
                        <img
                            className="weather-card-img"
                            src={this.state.img}
                            alt=""
                        />
                        <span className="weather-card-temp">{this.state.temp}°</span>
                        <div className="weather-card-degrees">
                            <button id="celcius-btn">C</button>
                            <button id="fahrenheit-btn">F</button>
                        </div>
                    </div>
                    <h3 className="weather-card-status">{this.state.status}</h3>
                    <span className="weather-card-updated">Dernière mise à jour à {this.state.date}</span>
                    <div className="weather-card-infos">
                        <span>Température ressentie : {this.state.feel}°</span>
                        <span>Vent : {this.state.wind} km/h</span>
                        <span>Visibilité : {this.state.visibility}km</span>
                        <span>Baromètre : {this.state.barometer} hPa</span>
                        <span>Humidité : {this.state.humidity}%</span>
                        <span>Point de rosée : {this.state.dew}°</span>
                    </div>
                </div>
            </div>
        );
    }
}
