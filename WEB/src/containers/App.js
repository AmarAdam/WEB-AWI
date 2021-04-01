import './App.css';
import React from 'react';
import Nav from './Nav';
import About from '../components/About';
import Games from '../components/Games/Games';
import GamesDetail from '../components/Games/GamesDetail';
import GamesForm from '../components/Games/GamesForm';
import Login from '../components/Login';
import Festivals from '../components/Festivals/Festivals';
import Editors from '../components/Editors/Editors';
import FestivalDetails from '../components/Festivals/FestivalDetails';
import {createBrowserHistory} from 'history';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Organizers from '../components/Organizers/Organizers';
import NewReservation from '../components/Reservations/NewReservation';
import Contact from '../components/Contact';
import Reservation from '../components/Reservations/Reservation';
import Bills from '../components/Bills/Bills'

function App(props) {  
  
  const isLoggedIn = props.isLoggedIn
  const history = createBrowserHistory();

  if (isLoggedIn){
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/home" exact component={Home}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/festivals" component={Festivals}/>
            <Route path="/games" component={Games}/>
            <Route path="/gamesdetail/:id" component={GamesDetail}/>
            <Route path="/gamesform" component={GamesForm}/>
            <Route path="/editors" component={Editors}/>
            <Route path="/festival/:id" component={FestivalDetails}/>
            <Route path="/organizers" component={Organizers}/>
            <Route path="/newReservation/:id" component={NewReservation}/>
            <Route path="/reservation/:id" component={Reservation}/>
            <Route path="/bills" component={Bills}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }else{
    return(
      <Login/>
    );
  }
}

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

export default App;
