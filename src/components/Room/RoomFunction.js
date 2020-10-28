import breakfastIcon from '../../assets/icons/breakfast.svg';
import miniBarIcon from '../../assets/icons/mini-bar.svg';
import roomServiceIcon from '../../assets/icons/room-service.svg';
import wifiIcon from '../../assets/icons/wifi.svg';
import playgroundIcon from '../../assets/icons/playground.svg';
import phoneIcon from '../../assets/icons/phone.svg';
import viewIcon from '../../assets/icons/view.svg';
import fridgeIcon from '../../assets/icons/fridge.svg';
import sofaIcon from '../../assets/icons/sofa.svg';
import petsIcon from '../../assets/icons/pets.svg';
import noSmokingIcon from '../../assets/icons/no-smoking.svg';
import airConditionerIcon from '../../assets/icons/air-conditioner.svg';

const getRoomDetial = (str=>{
    if(!str) return [];
    
    return str.split('. ');
});

const getRoomDes = (obj=>{
    if(!obj) return [];
    
    let guestRange = (obj.GuestMax == obj.GuestMin) ? obj.GuestMin : obj.GuestMin + '~' + obj.GuestMax;
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

export {getRoomDetial, getRoomDes, getRoomAmenities}