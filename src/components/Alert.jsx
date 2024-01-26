import React from 'react';

function Alert({ message }) {
 return (
  <div className="container mt-5">
   <div className="alert alert-danger mb-0 w-50 mx-auto" role="alert">
    {message}
   </div>
  </div>
 )
}

export default Alert
