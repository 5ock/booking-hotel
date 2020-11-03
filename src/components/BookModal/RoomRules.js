import React from 'react';
import './BookModal.scss'

// icon
import documentIcon from '../../assets/icons/document.svg';
import smsIcon from '../../assets/icons/sms.svg';
import paymentIcon from '../../assets/icons/payment.svg';
import rightArrowIcon from '../../assets/icons/right-arrow.svg';


import {getRoomDes, getRoomAmenities} from '../../assets/js/RoomFunction'

const RoomRules= ({info}) => {
    const checkInEarly = info.checkInAndOut.checkInEarly;
    const checkInLate = info.checkInAndOut.checkInLate;
    const checkOut = info.checkInAndOut.checkOut;
    const roomName = info.name;
    const holidayPrice = info.holidayPrice;
    const normalDayPrice = info.normalDayPrice;
    const roomDes =  getRoomDes(info.descriptionShort);

    const roomAmenities = () => {
        let ary = getRoomAmenities(info.amenities);
        return ary.filter(({exist}) => {
            if(exist) return true;
            return false;
        }).map(({path}) => {
            return (
                <li key={path}>
                    <img alt="" src={path}></img>
                </li>
            )
        });
    }

    return (
        <div className="bookRoomInfo">
            <div className="roomTypeHeading">
                <h2 className="roomType">{roomName}</h2>
                <div className="hrLine" />
            </div>
            <div className="bookRoomDes">
                <p>{roomDes}</p>
                <p>{`平日 ( 一 ~ 四 ) 價格 : ${normalDayPrice} / 假日 ( 五 ~ 日 ) 價格 : ${holidayPrice}`}</p>
                <ul className="bookAmenities">
                    {roomAmenities()}
                </ul>
            </div>
            <div className="roomTypeHeading">
                <h2 className="roomType">訂房資訊</h2>
                <div className="hrLine" />
            </div>
            <ul className="BookRoomRules">
                <li>{`入住時間：最早${checkInEarly}，最晚${checkInLate}；退房時間：${checkOut}，請自行確認行程安排。`}</li>
                <li>平日定義週一至週四；假日定義週五至週日及國定假日。</li>
                <li>好室旅店全面禁止吸菸。</li>
                <li>若您有任何問題，歡迎撥打 03-1234567（服務時間 週一至週六 10:00 - 18:00）。</li>
            </ul>
            <div className="roomTypeHeading">
                <h2 className="roomType">預約流程</h2>
                <div className="hrLine" />
            </div>
            <div className="steps">
                <div className="step">
                    <div className='documentIconWrap'>
                        <img className="stepIcon" src={documentIcon} alt="" />
                    </div>
                    <div className="stepTextContainer">
                        <p>送出線上預約單</p>
                    </div>
                </div>
                <div className="arrowWrap">
                    <img src={rightArrowIcon} alt="" />
                </div>
                <div className="step">
                    <div className='documentIconWrap'>
                        <img className="stepIcon" src={smsIcon} alt="" />
                    </div>
                    <div className="stepTextContainer">
                        <p>系統立即回覆是否預定成功</p>
                        <p>並以簡訊發送訂房通知</p>
                        <p>若未收到檢運請來電確認</p>
                    </div>
                </div>
                <div className="arrowWrap">
                    <img src={rightArrowIcon} alt="" />
                </div>
                <div className="step">
                    <div className='documentIconWrap'>
                        <img className="stepIcon" src={paymentIcon} alt="" />
                    </div>
                    <div className="stepTextContainer">
                        <p>入住當天憑訂房通知</p>
                        <p>以現金或刷卡付款即可</p>
                        <p>僅接受VISA, JCB, 銀聯卡</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomRules;