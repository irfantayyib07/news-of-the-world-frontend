import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import FilterProvider from "./contexts/filterContext";

const root = ReactDOM.createRoot(document.getElementById('site-wrapper'));
root.render(
 <React.StrictMode>
  <FilterProvider>
   <App />
  </FilterProvider>
 </React.StrictMode>
);
