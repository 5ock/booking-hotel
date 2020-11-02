import React from 'react';
import BrandLogo from '../../assets/imgs/logo.svg';
import BgRadio from './BgRadio'

const designerURl = 'https://challenge.thef2e.com/user/2232?schedule=3968#works-3968';

const Sidebar = () => {
    return (
        <header>
            <picture className="brandLogo">
                <img alt="" src={BrandLogo}></img>
            </picture>
            <h1 className="hotelName">好室旅店。House Hotel</h1>
            <div>
                <p className="hotelInfo">花蓮縣花蓮市國聯一路1號</p>
                <p className="hotelInfo">03-8321155</p>
                <p className="hotelInfo">House@Hotel.com</p>
            </div>
            <BgRadio />
            <div className="designerBlock">
                <span>UI DESIGN by </span>
                <a href={designerURl}>Pei-Chuan Li</a>
            </div>
        </header>
    )
}

export default Sidebar;