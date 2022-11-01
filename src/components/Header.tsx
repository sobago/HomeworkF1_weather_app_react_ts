import React, { useState } from "react";
import { WiSunrise } from "react-icons/wi";
import { IconContext } from "react-icons";
import { CiSettings } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import "../css/Header.css"

interface Props {
    children?: React.ReactNode
    userCity?: string
    onClickGetCity: Function
};

function Header({ children, userCity, onClickGetCity }: Props) {
    let [editCity, setEditCity] = useState(false);
    let [cityFromForm, setCityFromForm] = useState("");
    
    // Disable page refresh when pressing Enter
    const onFormSubmit = (e : any) => {
            e.preventDefault();
            onClickGetCity(cityFromForm)
          }

    return (
        <header>
            <h1>Погода</h1>
            <IconContext.Provider value={{
                color: "rgb(255, 191, 0)",
                size: "3em",
                className: "header-icon"
            }}>
                <WiSunrise />
            </IconContext.Provider>
            <div className="user-city">{
                userCity ? userCity : "Город не определен"
            } <CiSettings onClick={() => {
                setEditCity(editCity = !editCity)
            }} className="settings-icon" />
                {(editCity || !userCity) && <form id="enter-city-form" onSubmit={onFormSubmit}>
                    <input type="text" placeholder="Введите город" onChange={(e) => {
                        setCityFromForm(e.target.value) 
                    }}/>
                    <button type="button" id="search-button"><IoSearch onClick={() => onClickGetCity(cityFromForm)} /></button>
                </form>}
            </div>
        </header>
    )
};



export default Header
