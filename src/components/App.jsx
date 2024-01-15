import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import News from './News';

class App extends Component {
 apiKey = process.env.REACT_APP_NEWS_API_KEY;

 categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
 ]

 render() {
  return (
   <>
    <Router>
     <NavBar />
     <Routes>
      <Route path='/' element={<News apiKey={this.apiKey} key="home" />} />
      {
       this.categories.map(category => (
        <Route
         path={`/${category}`}
         key={category}
         element={<News apiKey={this.apiKey} category={category} key={category} />}
        />))
      }
     </Routes>
    </Router>
   </>
  );
 }
}

export default App;
