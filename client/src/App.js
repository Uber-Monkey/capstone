/*

https://www.youtube.com/watch?v=DAWWf7q8sqM
*/

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from './pages/Home'
import Movies from './pages/Movies'
import Movie from './pages/Movie'
import AdminReview from './pages/AdminReview'
import './App.css';

export default function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/review">
            <AdminReview />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/movie">
            <Movie />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>

  );
}

