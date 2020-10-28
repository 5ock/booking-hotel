import axios from 'axios';

const request = axios.create({
  baseURL: 'https://challenge.thef2e.com/api/thef2e2019/stage6/',
  headers: {
    accept: 'appleication/json',
    authorization: 'Bearer b6zWQKzrk8jw2OPPRAh1Gahua6k3MWRRj5FIBkKpQd6rnHFCM5T0E0HZlVyx'
  }
});

export const apiGetAllRooms = () => request.get('/rooms');
export const apiGetRoom = id => request.get(`/room/${id}`);
export const apiPostBookingData = (id, data) => request.post(`/room/${id}`, data);