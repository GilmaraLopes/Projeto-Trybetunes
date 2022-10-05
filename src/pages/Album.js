import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    id: '',
    teste: '',
    albumList: [],
    // mostraInfo: false,

  };

  // handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   this.setState({
  //     [name]: value,
  //     isButtonDisable: (value.length < 2),
  //   });
  // };

  requestMusics = async () => {
    const { id } = this.state;
    const response = await getMusics(id);
    console.log(response);
    this.setState({
      teste: id,
      albumList: response,
      id: '',
    });
  };

  render() {
    return (
      <div data-testid="page-album">
        {/* { albumList.map((element) => (
            <div key={ element.collectionId }>
            <p data-testid="artist-name">Nome da banda/Artista</p>
            <p data-testid="album-name">Nome do Album/Artista</p>
       } */}
        <Header />
      </div>
    );
  }
}
