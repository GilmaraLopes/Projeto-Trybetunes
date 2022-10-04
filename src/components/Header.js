import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    loading: true,
    nome: '',
  };

  componentDidMount() {
    getUser().then((name) => {
      this.setState({
        loading: false,
        nome: name.name,
      });
    });
  }

  render() {
    const { nome, loading } = this.state;
    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">
          {loading ? <Loading /> : nome}
        </div>
        <BrowserRouter>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </BrowserRouter>
      </header>
    );
  }
}
