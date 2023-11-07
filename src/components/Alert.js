import React, { Component } from 'react'

export class Alert extends Component {
 render() {
  return (
   <div className="alert alert-danger" role="alert">
    You have made too many requests recently. Developer accounts are limited to 100 requests over a 24 hour period. Please upgrade to a paid plan if you need more requests.
   </div>
  )
 }
}

export default Alert
