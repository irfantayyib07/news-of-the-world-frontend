import { Component } from 'react';
import '../App.css';
import NavBar from './NavBar';
import News from './News';

class App extends Component {
  render() {
    return (
      <>
      <NavBar />
      <News />
      </>
    );
  } 
}

export default App;
