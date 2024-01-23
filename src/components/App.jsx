import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import News from './News';

function App() {
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
     <Route path='/' element={<News />} />
     {
      categories.map(category => (
       <Route
        path={`/${category}`}
        key={category}
        element={<News />}
       />))
     }
    </Routes>
   </Router>
  </>
 );
}

export default App;
