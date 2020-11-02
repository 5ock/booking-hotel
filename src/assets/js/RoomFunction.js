import breakfastIcon from '../icons/breakfast.svg';
import miniBarIcon from '../icons/mini-bar.svg';
import roomServiceIcon from '../icons/room-service.svg';
import wifiIcon from '../icons/wifi.svg';
import playgroundIcon from '../icons/playground.svg';
import phoneIcon from '../icons/phone.svg';
import viewIcon from '../icons/view.svg';
import fridgeIcon from '../icons/fridge.svg';
import sofaIcon from '../icons/sofa.svg';
import petsIcon from '../icons/pets.svg';
import noSmokingIcon from '../icons/no-smoking.svg';
import airConditionerIcon from '../icons/air-conditioner.svg';

const calPriceAndNights = (info, selectDate) => {
    if(info.length === 0) return {};

    let night, price;
    let holidays = 0;
    let weekDayPrice = info.normalDayPrice;
    let holidayPrice = info.holidayPrice;

    night = selectDate[0].endDate.getDate() - selectDate[0].startDate.getDate();
    for(let i=0; i<night; i++) {
        let date = new Date(selectDate[0].startDate);
        date.setDate(date.getDate() + i);
        if(date.getDay() > 4) {
            holidays++;
        }        
    }
    price = (night - holidays) * weekDayPrice + holidays * holidayPrice;

    return {night, price, holidays};
};

const getDateStr = (addDayCount, startDate) => {
    let someDay = new Date();
    if(startDate) {
        someDay = new Date(startDate);
    }
    someDay.setDate(someDay.getDate()+addDayCount);
    return someDay;
};

const getRoomDetial = (str=>{
    if(!str) return [];
    
    return str.split('. ');
});

const getRoomDes = (obj=>{
    if(!obj) return [];
    
    let guestRange = (obj.GuestMax === obj.GuestMin) ? obj.GuestMin : obj.GuestMin + '~' + obj.GuestMax;
    return guestRange+'人、衛浴'+obj['Private-Bath']+'間、'+obj.Footage+'平方公尺';
});

const getRoomAmenities = (obj=>{
    if(!obj) return [
        { path: breakfastIcon, exist: false },
        { path: miniBarIcon, exist: false },
        { path: roomServiceIcon, exist: false },
        { path: wifiIcon, exist: false },
        { path: playgroundIcon, exist: false },
        { path: phoneIcon, exist: false },
        { path: viewIcon, exist: false },
        { path: fridgeIcon, exist: false },
        { path: sofaIcon, exist: false },
        { path: petsIcon, exist: false },
        { path: noSmokingIcon, exist: false },
        { path: airConditionerIcon, exist: false }
    ];
    
    return [
        { path: breakfastIcon, exist: obj['Breakfast'] },
        { path: miniBarIcon, exist: obj['Mini-Bar'] },
        { path: roomServiceIcon, exist: obj['Room-Service'] },
        { path: wifiIcon, exist: obj['Wi-Fi'] },
        { path: playgroundIcon, exist: obj['Child-Friendly'] },
        { path: phoneIcon, exist: obj['Television'] },
        { path: viewIcon, exist: obj['Great-View'] },
        { path: fridgeIcon, exist: obj['Refrigerator'] },
        { path: sofaIcon, exist: obj['Sofa'] },
        { path: petsIcon, exist: obj['Pet-Friendly'] },
        { path: noSmokingIcon, exist: obj['Smoke-Free'] },
        { path: airConditionerIcon, exist: obj['Air-Conditioner'] },

    ];
});

export {getRoomDetial, getRoomDes, getRoomAmenities, getDateStr, calPriceAndNights}