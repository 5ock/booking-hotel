import React, { useEffect, useState} from 'react';

//api
import {apiGetRoom} from '../../api'

//component
import RoomStatus from './RoomStatus'

const RoomInfo = (props) => {
    const [roomInfo, setRoomInfo] = useState([]);
    const [booking, setBooking] = useState();
    const [loading, setLoading] = useState(false);
    const id = props.location.state.roomId;

    useEffect(()=>{
        let isMounted = true;
        setLoading(true);
        getRoomInfo().then((res)=>{
            if(res.data.success && isMounted) {
                setRoomInfo(res.data.room[0]);
                setBooking(res.data.booking);
                setLoading(false);
            }
        });
        return function clean() {
            isMounted = false;
        }
    }, [])

    async function getRoomInfo() {
        return await apiGetRoom(id);
    }
    if(loading) return (<div>Loading...</div>);

    return (
        <>
            <div className="container">
                <RoomStatus
                    info={roomInfo}
                    checkInAndOut={roomInfo.checkInAndOut || {}}
                    loading={loading}></RoomStatus>
            </div>
        </>
    );
}

export default RoomInfo;