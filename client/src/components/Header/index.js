import React, { Component } from 'react';
import './style.css';

class Header extends Component {
    
  render() { 
      return (
          <div className="header">
              <h1>Kai's blog</h1>
              <p>If you cannot measure it, you cannot improve it</p>
          </div>
        );
  }
}

export default Header;
