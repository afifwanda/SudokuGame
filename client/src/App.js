import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Add from './pages/AddBoard';

const routes = [
  {
    path : '/',
    exact : true,
    children : <Home />
  },
  {
    path : '/game/:id',
    exact : true,
    children : <Game />
  },
  {
    path : '/add',
    exact : true,
    children : <Add />
  },
]

function App() {
  return (
    <Router>
      <div>
        <Switch>
          {routes.map(element =>{
            return(
              <Route {...element}/>
            )
          })}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
