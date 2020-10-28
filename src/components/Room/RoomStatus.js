import React, { useEffect, useState} from 'react';

// methods
import {getRoomDes, getRoomDetial, getRoomAmenities} from './RoomFunction'

// import check icon
import checkMarkIcon from '../../assets/icons/check-mark.svg'
import crossMarkIcon from '../../assets/icons/cross-mark.svg'

const RoomStatus = ({info, checkInAndOut}) => {
    const roomDes =  getRoomDes(info.descriptionShort);
    const roomDetialList = getRoomDetial(info.description);
    const roomAmenities = getRoomAmenities(info.amenities);
    console.log(roomAmenities);
    return (
        <div className="roomMain">
            <div className="roomStatusHeader">
                <h1 className="roomStatusName">{info.name}</h1>
                <h2 className="roomDes">{roomDes}</h2>
            </div>
            <div className="roomRules">
                <p>{`平日 ( 一 ~ 四 ) 價格 : ${info.normalDayPrice} / 假日 ( 五 ~ 日 ) 價格 : ${info.holidayPrice}`}</p>
                <p>{`入住時間 : ${checkInAndOut.checkInEarly} ( 最早 ) / ${checkInAndOut.checkInLate} ( 最晚 )`}</p>
                <p>{`退房時間 : ${checkInAndOut.checkOut}`}</p>
            </div>
            <ul className="roomDetial">{roomDetialList.map((sentence, index)=>{
                return (<li key={index}>{sentence}</li>);
            })}</ul>
            <ul className="roomAmenities">
                {roomAmenities&& roomAmenities.map(({path, exist})=>{
                    let imgSrc = exist ? checkMarkIcon : crossMarkIcon;
                    let liClassName = exist ? 'amenities' : 'amenities notSupport'
                    
                    return (
                        <li key={path} className={liClassName}>
                            <img src={path}></img>
                            <img className="amenitiesStatus" src={imgSrc}></img>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default RoomStatus;