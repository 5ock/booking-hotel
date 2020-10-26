import React, { useEffect, useState } from 'react';
import '../assets/scss/index.scss';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

//page
import Home from './Home/Home'

function App() {
  const header = {
    accept: 'appleication/json',
    authorization: 'Bearer b6zWQKzrk8jw2OPPRAh1Gahua6k3MWRRj5FIBkKpQd6rnHFCM5T0E0HZlVyx'
  }

  const [roomsInfo, setRoomsInfo] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{    
    async function getData() {
      const api = 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms';
      const result = await axios(api, {method: 'GET', headers: header});
      // setRoomsInfo(result.data);
      if(result.data.success) {
        setRoomsInfo(result.data.items);
        setLoading(true);
      }
    }
    getData();
  }, []);

  const renderHome = () => {
    // const {rooms} = roomsInfo;
    return <Home rooms={roomsInfo} />;
  }

  if(loading) {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={renderHome}></Route>
            <Route path="/about" component={About}></Route>
          </Switch>
        </div>
      </Router>
    );
  } else {
    return (
      <div>Loading ...</div>
    );
  }
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