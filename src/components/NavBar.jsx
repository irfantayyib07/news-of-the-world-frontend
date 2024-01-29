import { Link } from 'react-router-dom';
import { useFilter } from "../hooks/useFilter";

function NavBar() {
 const { pageState: [page, setPage] } = useFilter();

 const handleCategoryChange = () => {
  setPage(1);
 }

 return (
  <>
   <nav className="navbar navbar-expand-lg bg-secondary navbar-dark">
    <div className="container">
     <Link className="navbar-brand" to="/">NewsOfTheWorld</Link>
     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
     </button>
     <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       <li className="nav-item"><Link className="nav-link" to="/general" onClick={handleCategoryChange}>General</Link></li>
       <li className="nav-item"><Link className="nav-link" to="/business" onClick={handleCategoryChange}>Business</Link></li>
       <li className="nav-item"><Link className="nav-link" to="/entertainment" onClick={handleCategoryChange}>Entertainment</Link></li>
       <li className="nav-item"><Link className="nav-link" to="/health" onClick={handleCategoryChange}>Health</Link></li>
       <li className="nav-item"><Link className="nav-link" to="/science" onClick={handleCategoryChange}>Science</Link></li>
       <li className="nav-item"><Link className="nav-link" to="/sports" onClick={handleCategoryChange}>Sports</Link></li>
       <li className="nav-item"><Link className="nav-link" to="/technology" onClick={handleCategoryChange}>Technology</Link></li>
      </ul>
     </div>
    </div>
   </nav>
  </>
 );
}

export default NavBar;
