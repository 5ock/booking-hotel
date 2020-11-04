import axios from 'axios';

const request = axios.create({
  baseURL: '',
  headers: {
    accept: '',
    authorization: ''
  }
});

export const apiGetAllRooms = () => request.get('/rooms');
export const apiGetRoom = id => request.get(`/room/${id}`);
export const apiPostBookingData = (id, data) => request.post(`/room/${id}`, data);