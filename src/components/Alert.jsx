import React, { Component } from 'react'

export class Alert extends Component {
 render() {
  return (
   <div className="alert alert-danger" role="alert">
    {this.props.message}
   </div>
  )
 }
}

export default Alert
