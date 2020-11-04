import React, { useEffect, useState } from 'react';
import '../assets/scss/index.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

//api
import {apiGetAllRooms} from '../api'

//page
import Home from './Home/'
import RoomInfo from './Room/'

function App() {
  const [roomsInfo, setRoomsInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    async function getData() {
      const result = await apiGetAllRooms();
      if(result.data.success) {
        setRoomsInfo(result.data.items);
        setLoading(false);
      }
    }

    getData();
  }, []);

  const renderHome = () => {
    return <Home rooms={roomsInfo} />;
  }

  if(loading) {return (<div>Loading...</div>)};

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" render={renderHome}></Route>
          <Route path="/room/:name" component={RoomInfo}></Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;