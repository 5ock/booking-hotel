import React from 'react';
import {Link} from 'react-router-dom';

const HomeType = ({rooms}) => {
    return (
        <main className='roomTypeBlock'>
            {rooms.map((room)=>{
                const {id, name, imageUrl} = room;
                let roomTypeAry = name.split(' ');
                let linkAddress = '/room/';
                linkAddress += (roomTypeAry.length>2) ? roomTypeAry[0]+roomTypeAry[1] : roomTypeAry[0];
                return (
                    <Link key={id} className='room' to={linkAddress}>
                        <img className='imgWrap' src={imageUrl}></img>
                        <span className='roomName'>{name}</span>
                    </Link>
                )
            })}
        </main>
    )
}

export default HomeType;