import React, {useState} from 'react';
import './BookModal.scss'
import {Calendar} from 'react-date-range';

// component
import RoomRules from './RoomRules'
import Popview from './Popview'

// api
import {apiPostBookingData} from '../../api'

import {calPriceAndNights, getDateStr} from '../../assets/js/RoomFunction'

const addZero = (x) => {
    if(x<10) {
        x = '0'+String(x);
    }
    return x;
}

const BookModal = ({toggleModal, info, dateRange}) => {
    const [loading, setLoading] = useState(false);
    const [bookingStatus, setBookingStatus] = useState();
    // open checkin, checkout Calendar
    const [openCheckin, setOpenCheckin] = useState(false);
    const [openCheckOut, setOpenCheckOut] = useState(false);
    // select date range
    const [startDate, setStartDate] = useState(dateRange[0].startDate);
    const [endDate, setEndDate] = useState(dateRange[0].endDate);
    // input value
    const [guestInfo, setGuestInfo] = useState({
        name: '',
        phone: '',
    });
    
    // 
    const updateGuestInfo = (e) => {
        setGuestInfo({
            ...guestInfo,
            [e.target.name]: e.target.value
        });
    };

    // Calendar function
    const pickStartDate = (date) => {
        setStartDate(date);
        if(date.getDate() >= endDate.getDate() || date.getMonth() > endDate.getMonth()) {
            setEndDate(getDateStr(1,date));
        }
        setOpenCheckin(false);
    };
    const pickEndDate = (date) => {
        setEndDate(date);
        setOpenCheckOut(false);
    }
    const toggleCheckin = () => {
        setOpenCheckin(!openCheckin);
        setOpenCheckOut(false);
    }
    const toggleCheckout = () => {
        setOpenCheckOut(!openCheckOut);
        setOpenCheckin(false);
    }
    const checKInDate = `${startDate.getFullYear()}-${addZero(startDate.getMonth()+1)}-${addZero(startDate.getDate())}`;
    const checKOutDate = `${endDate.getFullYear()}-${addZero(endDate.getMonth()+1)}-${addZero(endDate.getDate())}`;
    
    const selectDate = [{startDate:startDate, endDate:endDate}]
    const {night, price, holidays} = calPriceAndNights(info, selectDate);
    const weekendCount = (holidays > 0) ? `，${holidays}晚假日` : '';
    const duration = `${night+1}天，${night-holidays}晚平日${weekendCount}`;

    // set booking
    const setBooking = (e) => {
        setLoading(true);
        e.preventDefault();
        const roomId = info.id;
        let dateAry = [];
        dateAry.push(checKInDate);
        if(night>1) {
            dateAry.push(checKOutDate);
        }
        const bookInfo = {
            name: guestInfo.name,
            tel: guestInfo.phone,
            date: dateAry
        }

        apiPostBookingData(roomId, bookInfo).then(res=>{
            if(res.date.success) setBookingStatus('success');
            setLoading(false);
        }).catch(error=>{
            setBookingStatus('error');
            setLoading(false);
        })
    }
    if(bookingStatus === 'success') return <Popview status="Success" sentences={['請留意簡訊發送訂房通知', '入住當日請出示訂房通知', '若未收到請來電確認，謝謝']} toggleModal={toggleModal} />
    if(bookingStatus === 'error') return <Popview status='Error' sentences={['晚了一步','看看其他房型吧']} toggleModal={toggleModal} />
    if(loading) return <Popview status='Loading' sentences={['預約中，請耐心等候']} toggleModal={toggleModal} />

    return (
        <div className="bookModalBg">
            <div className="bookModalContainer">
                <form className="bookSidebar" onSubmit={setBooking}>
                    <div className="label">
                        <span className="labelText">姓名</span>
                        <input
                            required
                            className="labelInput"
                            name="name"
                            onChange={(e)=>{updateGuestInfo(e)}}
                            autoComplete="off"
                        />
                    </div>
                    <div className="label">
                        <span className="labelText">手機號碼</span>
                        <input
                            required
                            minLength={10}
                            maxLength={10}
                            className="labelInput"
                            name="phone"
                            onChange={(e)=>{updateGuestInfo(e)}}
                            autoComplete="off"
                        />
                    </div>
                    <div className="label">
                        <span className="labelText">入住日期</span>
                        <button type="button" className="labelButton" onClick={toggleCheckin}>{checKInDate}</button>
                        
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
                        <button type="button" className="labelButton"onClick={toggleCheckout}>{checKOutDate}</button>
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
                <RoomRules info={info}/>
                <div onClick={toggleModal} className="closeButton"></div>
            </div>
        </div>
    )
}

export default BookModal;