import React, {useState} from 'react';
import './BookModal.scss'
import {Calendar} from 'react-date-range';

// icon
import documentIcon from '../../assets/icons/document.svg';
import smsIcon from '../../assets/icons/sms.svg';
import paymentIcon from '../../assets/icons/payment.svg';
import rightArrowIcon from '../../assets/icons/right-arrow.svg';


import {getRoomDes, getRoomAmenities, calPriceAndNights, getDateStr} from '../../assets/js/RoomFunction'

const BookModal = ({toggleModal, info, dateRange}) => {
    const [openCheckin, setOpenCheckin] = useState(false);
    const [openCheckOut, setOpenCheckOut] = useState(false);
    const [startDate, setStartDate] = useState(dateRange[0].startDate);
    const [endDate, setEndDate] = useState(dateRange[0].endDate);
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

    const pickStartDate = (date) => {
        setStartDate(date);
        if(date.getDate() > endDate.getDate() || date.getMonth() > endDate.getMonth() || date.getFullYear() > endDate.getFullYear()) {
            setEndDate(getDateStr(1,date));
        }
        setOpenCheckin(false);
    };
    const pickEndDate = (date) => {
        setEndDate(date);
        setOpenCheckOut(false);
    }
    const chechInDate = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`;
    const chechOutDate = `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`;
    
    const selectDate = [{startDate:startDate, endDate:endDate}]
    const {night, price, holidays} = calPriceAndNights(info, selectDate);
    const weekendCount = (holidays > 0) ? `，${holidays}晚假日` : '';
    const duration = `${night+1}天，${night-holidays}晚平日${weekendCount}`;

    const toggleCheckin = () => {
        setOpenCheckin(!openCheckin);
        setOpenCheckOut(false);
    }
    const toggleCheckout = () => {
        setOpenCheckOut(!openCheckOut);
        setOpenCheckin(false);
    }


    return (
        <div className="bookModalBg">
            <div className="bookModalContainer">
                <form  className="bookSidebar">
                    <div className="label">
                        <span className="labelText">姓名</span>
                        <input className="labelInput" />
                    </div>
                    <div className="label">
                        <span className="labelText">手機號碼</span>
                        <input className="labelInput" />
                    </div>
                    <div className="label">
                        <span className="labelText">入住日期</span>
                        <button type="button" className="labelButton" onClick={toggleCheckin}>{chechInDate}</button>
                        
                    {openCheckin && <div className="datePicker">
                        <Calendar
                            showMonthAndYearPickers={false}
                            minDate={getDateStr(1)}
                            maxDate={getDateStr(89)}
                            color="rgba(148, 156, 124, 0.8)"
                            onChange={pickStartDate}
                            date={startDate}
                        />
                    </div>}
                    </div>
                    <div className="label">
                        <span className="labelText">退房日期</span>
                        <button type="button" className="labelButton"onClick={toggleCheckout}>{chechOutDate}</button>
                    </div>                    
                    {openCheckOut && <div className="datePicker checkout">
                        <Calendar
                            showMonthAndYearPickers={false}
                            minDate={getDateStr(1,startDate)}
                            maxDate={getDateStr(89)}
                            color="rgba(148, 156, 124, 0.8)"
                            date={endDate}
                            onChange={pickEndDate}
                        />
                    </div>}
                    <p className="duration">{duration}</p>
                    <p className="total">總計</p>
                    <p className="totalAmount">{`$${price.toLocaleString()}`}</p>
                    <button type="submit" className="submitButton">確認送出</button>
                </form>
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
                <div onClick={toggleModal} className="closeButton"></div>
            </div>
        </div>
    )
}

export default BookModal;