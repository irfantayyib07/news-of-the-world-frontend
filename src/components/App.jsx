import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import News from './News';

function App() {
 return (
  <>
   <Router>
    <NavBar />
    <Routes>
     <Route path=":category?" element={<News />} />
    </Routes>
   </Router>
  </>
 );
}

export default App;
