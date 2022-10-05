import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  state = {
    nome: '',
    teste: '',
    isButtonDisable: true,
    artistNameList: [],
    loading: false,
    // mostraInfo: false,

  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      isButtonDisable: (value.length < 2),
    });
  };

  requestAlbuns = async () => {
    const { nome } = this.state;
    this.setState({ loading: true });
    const response = await searchAlbumsAPI(nome);
    this.setState({
      teste: nome,
      artistNameList: response,
      loading: false,
      nome: '',
    });
  };

  render() {
    const { isButtonDisable, artistNameList, teste, loading } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <form>
            <label htmlFor="pesquisa">
              Nome do artista ou banda:
              <input
                type="text "
                name="nome"
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
        )}
        {
          artistNameList.length === 0 ? <p>Nenhum álbum foi encontrado</p>
            : (
              <div>
                <p>
                  {`Resultado de álbuns de: ${teste}`}
                </p>

                {
                  artistNameList.map((element) => (
                    <div key={ element.collectionId }>

                      <img src={ element.artworkUrl100 } alt={ element.artistName } />
                      <Link
                        to={ `/album/${element.collectionId}` }
                        data-testid={ `link-to-album-${element.collectionId}` }
                      >
                        {' '}
                        {element.collectionName}
                      </Link>
                    </div>
                  ))
                }
              </div>
            )
        }
      </div>
    );
  }
}
