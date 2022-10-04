import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    artist: '',
    isButtonDisable: true,

  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      isButtonDisable: (target.value.length < 2),
    });
  };

  requestAlbuns = async () => {
    const { artist } = this.state;
    const response = await searchAlbumsAPI(artist);
    console.log(response);
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
              name="artist"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              onClick={ this.requestAlbuns }
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
