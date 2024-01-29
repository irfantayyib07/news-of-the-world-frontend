import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import News from './News';
import { CATEGORIES } from "../constants/categories";

function App() {
 return (
  <>
   <Router>
    <NavBar />
    <Routes>
     <Route path='/' element={<News category="general" key="home" />} />
     {
      CATEGORIES.map(category => (
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
