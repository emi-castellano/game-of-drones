import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import InitPage from './components/containers/InitPage';
import GamePlayPage from './components/containers/GamePlayPage';
import WinnerPage from './components/containers/WinnerPage';
import LeaderboardPage from './components/LeaderboardPage';
import ConfigPage from './components/containers/ConfigPage';
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
            <Route path="/configuration" component={ConfigPage}/>
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
