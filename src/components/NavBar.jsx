import { Link } from 'react-router-dom';
import { useFilter } from "../hooks/useFilter";

function NavBar() {
 const { pageState: [page, setPage] } = useFilter();

 const handleCategoryChange = (e) => {
  setPage(1);

  const navItems = document.querySelectorAll(".nav-item");

  for (let i = 0; i < navItems.length; i++) {
   let generalTab;
   if (navItems[i].firstChild.pathname === "/") generalTab = navItems[i].firstChild;
   console.log(generalTab);

   navItems[i].firstChild.classList.remove("active");

   if (e.target.classList.contains("navbar-brand") && generalTab) {
    generalTab.classList.add("active");
   }
  }

  e.target.classList.add("active");
 }

 return (
  <>
   <nav className="navbar navbar-expand-lg bg-secondary navbar-dark">
    <div className="container">
     <Link className="navbar-brand" to="/" onClick={handleCategoryChange}>NewsOfTheWorld</Link>
     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
     </button>
     <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       <li className="nav-item"><Link className="nav-link active" to="/" onClick={handleCategoryChange}>General</Link></li>
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
