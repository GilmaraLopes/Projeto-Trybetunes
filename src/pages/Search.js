import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    // nome: '',
    isButtonDisable: true,

  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
      isButtonDisable: (target.value.length < 2),
    });
  };

  render() {
    const { isButtonDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="pesquisa">
            Nome do artista ou banda:
            <input
              type="text "
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              // onClick={}
              data-testid="search-artist-button"
              disabled={ isButtonDisable }
            >
              Procurar

            </button>
          </label>
        </form>
      </div>
    );
  }
}
