import React, { Component } from 'react';
import './stylesheet/App.css';

class Breadcrumbs extends Component {
  
  render() {
    return ( 
      <li className="li_breadcrumb" key={this.props.thiskey}> 
        <span className="span_breadcrumb">{this.props.breadCrumbs}</span>
        <span className="separate">{this.props.separate}</span>
      </li>
      
    );
  }
}

export default Breadcrumbs;