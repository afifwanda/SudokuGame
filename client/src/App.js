import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/index'
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
    <Provider store ={store}>
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
    </Provider>
  );
}

export default App;
