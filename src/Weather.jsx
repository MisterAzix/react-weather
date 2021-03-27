import React, { Component } from "react";
import logo from "./logo.svg";

export class Weather extends Component {
    render() {
        return (
            <div className="weather-card">
                <div className="weather-card-header">
                    <h1 className="weather-card-title">Bordeaux, Nouvelle-Aquitaine</h1>
                </div>
                <div className="weather-card-body">
                    <div className="weather-card-main">
                        <img
                            className="weather-card-img App-logo"
                            src={logo}
                            alt=""
                        />
                        <span className="weather-card-temp">4°</span>
                        <div className="weather-card-degrees">
                            <button id="celcius-btn">C</button>
                            <button id="fahrenheit-btn">F</button>
                        </div>
                    </div>
                    <h3 className="weather-card-stat">Clair</h3>
                    <span className="weather-card-updated">Dernière mise à jour à 01:24</span>
                    <div className="weather-card-infos">
                        <span>Température ressentie : 1°</span>
                        <span>Vent : 11 km/h</span>
                        <span>Visibilité : 10km</span>
                        <span>Baromètre : 1024,00 hPa</span>
                        <span>Humidité : 87%</span>
                        <span>Point de rosée : 2°</span>
                    </div>
                </div>
            </div>
        );
    }
}
