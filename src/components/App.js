import React, { useEffect, useState } from 'react';
import '../assets/scss/index.scss';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

//api
import {apiGetAllRooms} from '../api'

//page
import Home from './Home/Home'
import RoomInfo from './Room/RoomInfo'

function App() {
  const header = {
    accept: 'appleication/json',
    authorization: 'Bearer b6zWQKzrk8jw2OPPRAh1Gahua6k3MWRRj5FIBkKpQd6rnHFCM5T0E0HZlVyx'
  }

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
    // const {rooms} = roomsInfo;
    return <Home rooms={roomsInfo} />;
  }

  if(loading) {return (<div>Loading...</div>)};

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" render={renderHome}></Route>
          <Route path="/room/:name" component={RoomInfo}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;



// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}