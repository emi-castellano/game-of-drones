import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import InitPage from './components/InitPage';
import GamePlayPage from './components/GamePlayPage';
import WinnerPage from './components/WinnerPage';
import LeaderboardPage from './components/LeaderboardPage';
import { Provider } from 'react-redux';
import store from './store';
import './assets/css/main.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="routes">
          <Switch>
            <Route exact path='/' component={InitPage}/>
            <Route path='/gameplay' component={GamePlayPage}/>
            <Route path='/results' component={WinnerPage}/>
            <Route path="/leaderboard" component={LeaderboardPage}/>
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
