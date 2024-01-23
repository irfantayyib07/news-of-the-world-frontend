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
     <Route path='/' element={<News category="general" key="home" />} />
     {
      categories.map(category => (
       <Route
        path={`/${category}`}
        key={category}
        element={<News category={category} key={category} />}
       />))
     }
    </Routes>
   </Router>
  </>
 );
}

export default App;
