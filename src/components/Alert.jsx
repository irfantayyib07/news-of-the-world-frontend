import React from 'react';

function Alert({ message }) {
 return (
  <div className="container mt-4 mb-5">
   <div className="alert alert-danger" role="alert">
    {message}
   </div>
  </div>
 )
}

export default Alert
