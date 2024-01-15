import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import News from './News';

function App() {
 const apiKey = process.env.REACT_APP_NEWS_API_KEY;

 const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
 ];

 return (
  <>
   <Router>
    <NavBar />
    <Routes>
     <Route path='/' element={<News apiKey={apiKey} key="home" />} />
     {
      categories.map(category => (
       <Route
        path={`/${category}`}
        key={category}
        element={<News apiKey={apiKey} category={category} key={category} />}
       />))
     }
    </Routes>
   </Router>
  </>
 );
}

export default App;
