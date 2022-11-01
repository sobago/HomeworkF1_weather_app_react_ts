import React from "react";
import { WiThermometer,
    WiUmbrella,
    WiThermometerInternal,
    WiSunrise,
    WiSunset,
    WiThermometerExterior,
    WiStrongWind,
    WiWindDeg } from "react-icons/wi";
import {IoTimeOutline} from "react-icons/io5"

interface WeatherCardObject {
    clouds?: any
    weather?: any
    temp?: any
    feels_like?: any
    humidity?: any
    pressure?: any
    sunrise?: any
    sunset?: number
    wind_speed?: any
    wind_deg?: number
    dt: number
    precipitation?: number
}

interface Props {
    children?: React.ReactNode
    weather: WeatherCardObject[]
    getTime: Function
    keyy? : any
};

function WeatherCard ({children, weather, getTime, keyy}: Props) {
    
    function windDirectionToText(degree: number) {
        const sectors = ['Север','Северо-Восток','Восток','Юго-Восток','Юг','Юго-Запад','Запад','Северо-Запад'];
        
        degree += 22.5;
      
        if (degree < 0) 
          degree = 360 - Math.abs(degree) % 360;
        else 
          degree = degree % 360;
        
        let which = parseInt(String(degree / 45));
        return sectors[which];
      }

    return (
        <> {weather.map((el) =>
            <ul className="weather-card" key={el.dt+`${el.sunrise}`+el.wind_deg}>
                <li>
                    <IoTimeOutline className="li-icon"/>
                    <p>
                        {el.temp && el.temp.hasOwnProperty("day") ?
                        getTime(el.dt).split(" ")[0]
                        : getTime(el.dt)}
                    </p>
                </li>
                {el.clouds ?
                    <li>
                        <img src={`http://openweathermap.org/img/wn/${el.weather[0].icon}.png`} alt="Иконка погоды"  className="li-icon"/>
                        <p>{el.weather[0].description[0].toUpperCase()+el.weather[0].description.slice(1)}</p>
                        <p>Облачность: {el.clouds} %</p>
                    </li>
                :null}
                {el.temp && typeof(el.temp) === "number" ?
                    <li>
                        <WiThermometer className="li-icon"/>
                        <p>Текущая температура:  {el.temp}&deg;</p>
                    </li>
                :null}
                {el.temp && el.temp.hasOwnProperty("day") ?
                    <li>
                        <WiThermometer className="li-icon"/>
                        <p>Температура: </p>
                        <div>Утро: {el.temp.morn}&deg;</div>
                        <div>День: {el.temp.day}&deg;</div>
                        <div>Вечер: {el.temp.eve}&deg;</div>
                        <div>Ночь: {el.temp.night}&deg;</div>
                    </li>
                :null}
                {el.feels_like && typeof(el.feels_like) === "number" ?
                    <li>
                        <WiThermometerExterior className="li-icon"/>
                        <p>По ощущениям: {el.feels_like}&deg;</p>
                    </li>
                :null}
                {el.feels_like && el.feels_like.hasOwnProperty("day") ?
                    <li>
                        <WiThermometerExterior className="li-icon"/>
                        <p>По ощущениям: </p>
                        <div>Утро: {el.feels_like.morn}&deg;</div>
                        <div>День: {el.feels_like.day}&deg;</div>
                        <div>Вечер: {el.feels_like.eve}&deg;</div>
                        <div>Ночь: {el.feels_like.night}&deg;</div>
                    </li>
                :null}
                {el.humidity ?
                    <li>
                        <WiUmbrella className="li-icon"/>
                        <p>Влажность: {el.humidity} %</p>
                    </li>
                :null}
                {el.sunrise ?
                    <li>
                        <WiSunrise className="li-icon"/>
                        <p>Восход: {getTime(el.sunrise).split(" ")[0]}</p>
                    </li>
                : null}
                {el.sunset ?
                    <li>
                        <WiSunset className="li-icon"/>
                        <p>Закат: {getTime(el.sunset).split(" ")[0]}</p>
                    </li>
                : null}
                {el.pressure ?
                    <li>
                        <WiThermometerInternal className="li-icon"/>
                        <p>Атмосферное давление: {(el.pressure * 0.75).toFixed(1)} мм.рт.ст.</p>
                    </li>
                :null}
                {el.wind_speed ?
                <li>
                    <WiStrongWind className="li-icon"/>
                    <p>Скорость ветра: {el.wind_speed} м/с</p>
                </li>
                :null}
                {el.wind_deg ?
                    <li>
                        <WiWindDeg className="li-icon"/>
                        <p>Направление ветра: {windDirectionToText(el.wind_deg)}</p>
                    </li>
                : null}
                {el.hasOwnProperty("precipitation") ?
                    <li>
                        <WiUmbrella className="li-icon"/>
                        <p>Осадки: {el.precipitation}</p>
                    </li>
                : null}
            </ul>
        )}
        
            </>)
}

export default WeatherCard