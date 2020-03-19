import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import { Main, Make, Post } from 'pages';


class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Main}/>
        <Route path="/makepost" component={Make}/>
        <Route path="/post" component={Post}/>
      </div>
    );
  }
}

export default App;
