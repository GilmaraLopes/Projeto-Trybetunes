import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name"> </p>
        <BrowserRouter>
          <Link data-testid="link-to-search" to="/search">search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">profile</Link>
        </BrowserRouter>
      </header>
    );
  }
}
