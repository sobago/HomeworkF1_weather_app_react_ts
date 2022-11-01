import React, { useState } from "react";
import { WiSmallCraftAdvisory } from "react-icons/wi";
import "../css/Main.css";
import WeatherCard from "./WeatherCard";

interface WeatherObject {
    alerts?: any
    current?: any
    daily?: any
    hourly?: any
    minutely?: any
    timezone_offset?: any
    lat?: number
    lon?: number
  }

interface Props {
    children?: React.ReactNode
    userCity?: string
    latitude?: number
    longitude?: number
    weather?: WeatherObject
};

function Main({ children, userCity, latitude, longitude, weather}: Props) {
    let [tab, setTab] = useState("weather-now");
    let [hourly, setHourly] = useState(false)
    
    // Make a date-time string for weather cards
    function getTime(sec: number) {
        const date = new Date(sec * 1000);
        return `${date.getDate()}.${date.getMonth() < 10 ? "0" + date.getMonth(): date.getMonth()} ${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes(): date.getMinutes()}`
    }

    return (
        <main>
            {weather ? <div id="weather-main">
            <ul className="tabs">
                <li onClick={() => setTab(tab = "weather-now")}>Cейчас</li>
                <li onClick={() => setTab(tab = "weather-two-days")}>На 2 дня</li>
                <li onClick={() => setTab(tab = "weather-week")}>На неделю</li>
            </ul>
            { tab === "weather-now" ?
            <div id="weather-now">
                <div>
                
                {weather?.hasOwnProperty("alerts") ? 
                   weather.alerts.map((el: any) =>
                   el["description"] ?
                   <div className="alerts" key={`${weather.lat}+${weather.lon}+${el.description}+${el.start}+${el.end}`}>
                    <WiSmallCraftAdvisory className="alert-icon"/>
                    <span>{getTime(el["start"])}</span>
                    <span>{getTime(el["end"])}</span>
                    <span>{el["event"]}</span>
                    <span>{el["description"]}</span>
                   </div> :
                    null
                   ) : null}
                
                </div>
                <div className="current-weather">
                <WeatherCard weather={[weather.current]} getTime={getTime} keyy="test"/></div>
                {weather.hasOwnProperty("hourly") ?
                    <div>
                    <div className="hourly-weather-tab-wrapper">
                        <div id="hourly-weather-tab" onClick={() => setHourly(hourly = !hourly)}>
                            Открыть поминутный прогноз
                        </div>
                    </div>
                    { hourly ?
                    <div className="hourly-weather">
                        <WeatherCard weather={weather.minutely}  getTime={getTime}/>
                    </div>
                    : null} 
                    </div>
                :null }
            </div>
            : null
            }
            { tab === "weather-two-days" ?
                <div id="weather-two-days">
                    <WeatherCard weather={weather.hourly} getTime={getTime} keyy="test2"/>
                </div>
            :null }
            { tab === "weather-week" ?
                <div id="weather-week">
                    <WeatherCard weather={weather.daily} getTime={getTime}/>
                </div>
            :null }
        </div>: null} </main>
    )
};

export default Main
