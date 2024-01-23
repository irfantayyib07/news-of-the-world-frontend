import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../App.css';
import NavBar from './NavBar';
import News from './News';

class App extends Component {
 render() {
  return (
   <>
    <Router>
     <NavBar />
     <Routes>
      <Route exact path='/' element={<News key="home" />} />
      <Route exact path='/business' element={<News key="business" category="business" />} />
      <Route exact path='/entertainment' element={<News key="entertainment" category="entertainment" />} />
      <Route exact path='/general' element={<News key="general" category="general" />} />
      <Route exact path='/health' element={<News key="health" category="health" />} />
      <Route exact path='/science' element={<News key="science" category="science" />} />
      <Route exact path='/sports' element={<News key="sports" category="sports" />} />
      <Route exact path='/technology' element={<News key="technology" category="technology" />} />
     </Routes>
    </Router>
   </>
  );
 }
}

export default App;
