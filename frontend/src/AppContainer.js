import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import TweetContainer from './components/TweetContainer';
import TrendingContainer from './components/TrendingContainer';

function AppContainer() {
  return (
    <Router>
      <div className="container">
        <div className="flex-container">
          <h1 className="app-title">Welcome to a slightly-less useful Twitter Application</h1>
        </div>

        <div className="flex-col">
          <Link to="/" className="search-btn">
            <button className="btn btn-outline-primary">
              Search Tweets
            </button>
          </Link>

          <Link to="/trending" className="search-btn">
            <button className="btn btn-outline-primary">
              View Trending Tweets by Location
            </button>
          </Link>
        </div>

        <Switch>
          <Route path="/trending">
            <TrendingContainer />
          </Route>
          <Route path="/">
            <TweetContainer />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default AppContainer;
