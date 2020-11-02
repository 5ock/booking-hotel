import React from 'react';
import {Link} from 'react-router-dom'
import leftArrow from '../../assets/icons/left-arrow.svg'

import BgRadio from './BgRadio'

const Sidebar = ({night, price, imageUrls, toggleModal}) => {
    return (
        <header className="roomSidebar">
            <nav className="Nav">
                <Link to='/' className="Link">
                    <img alt="" src={leftArrow}></img>
                    <span className="navLinkText">查看其他房型</span>
                </Link>
            </nav>
            <div className="priceAndNight">
                <span className="price">$ {price} / </span>
                <span className="night">{`${night}晚`}</span>
            </div>
            <button className="bookBtn" onClick={toggleModal}>Book now</button>

            <BgRadio imageUrls={imageUrls}/>
        </header>
    )
}

export default Sidebar;