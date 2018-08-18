import React, { Component } from 'react';

import { BrowserRouter as Route } from 'react-router-dom';

import Home from './views/Home';

class App extends Component {
  render() {
    return (
      <Route>
        <Home />
      </Route>
    );
  }
}

export default App;
