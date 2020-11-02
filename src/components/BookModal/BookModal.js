import React, {useState} from 'react';
import './BookModal.scss'
import {Calendar} from 'react-date-range';

// component
import RoomRules from './RoomRules'


import {calPriceAndNights, getDateStr} from '../../assets/js/RoomFunction'

const BookModal = ({toggleModal, info, dateRange}) => {
    const [openCheckin, setOpenCheckin] = useState(false);
    const [openCheckOut, setOpenCheckOut] = useState(false);
    const [startDate, setStartDate] = useState(dateRange[0].startDate);
    const [endDate, setEndDate] = useState(dateRange[0].endDate);

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
                <RoomRules info={info}/>
                <div onClick={toggleModal} className="closeButton"></div>
            </div>
        </div>
    )
}

export default BookModal;