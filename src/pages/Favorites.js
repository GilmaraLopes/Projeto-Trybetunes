import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class Favorites extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.requestMusics();
  }

  criaLista = async () => {
    const loading = this.state;
    await getFavoriteSongs();
  };

  render() {
    return (
      <>
        <Header />
        <div data-testid="page-favorites">

          <MusicCard />
        </div>
      </>
    );
  }
}
