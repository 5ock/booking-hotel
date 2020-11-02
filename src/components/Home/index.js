import React from 'react';
import HomeType from './RoomType'
import Sidebar from './Sidebar'

const Home = ({rooms}) => {
    return (
        <div className="homeBlock">
            <div className='homeContainer'>
                <Sidebar></Sidebar>
                <HomeType rooms={rooms}></HomeType>
            </div>
        </div>
    )
}

export default Home;