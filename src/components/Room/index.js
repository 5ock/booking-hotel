import React, { useEffect, useState} from 'react';

//api
import {apiGetRoom} from '../../api'

//component
import RoomStatus from './RoomStatus'
import Sidebar from './Sidebar'
import BookModal from '../BookModal/BookModal'

//methods
import {getDateStr, calPriceAndNights} from '../../assets/js/RoomFunction'

const RoomInfo = (props) => {
    // props
    const id = props.location.state.roomId;
    
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [roomInfo, setRoomInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dateRange, setDateRange] = useState([{
        startDate: getDateStr(1),
        endDate: getDateStr(2),
        key: 'selection'
    }]);

    const toggleModal = () => {
        setIsOpenModal(!isOpenModal);
    }

    const selectDate = (e) => {
        let start = new Date(e.selection.startDate.valueOf());
        let end = new Date(e.selection.endDate.valueOf())
        setDateRange([{
            startDate: start,
            endDate: end,
            key: 'selection'
        }]);
    }

    const {night, price} = React.useMemo(()=>{return calPriceAndNights(roomInfo, dateRange)}, [roomInfo, dateRange])

    // get room data
    useEffect(()=>{
        let isMounted = true;
        setLoading(true);
        async function getRoomInfo() {
           const res =  await apiGetRoom(id);
           if(res.data.success && isMounted) {
               setRoomInfo(res.data.room[0]);
               setLoading(false);
           }
        }
        getRoomInfo();
        return function clean() {
            isMounted = false;
        }
    }, [id]);


    if(loading) return (<div>Loading...</div>);

    return (
        <>
            {isOpenModal && 
                <BookModal 
                    toggleModal={toggleModal}
                    info={roomInfo}
                    dateRange={dateRange}
                />
            }
            <div className="container">
                <Sidebar
                    night={night}
                    price={price}
                    imageUrls={roomInfo.imageUrl || []}
                    toggleModal={toggleModal}
                />
                <RoomStatus
                    info={roomInfo}
                    checkInAndOut={roomInfo.checkInAndOut || {}}
                    loading={loading} 
                    selectDate={selectDate}
                    dateRange={dateRange}
                />
            </div>
        </>
    );
}

export default RoomInfo;