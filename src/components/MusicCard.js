import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    checked: false,
    loading: false,
  };

  componentDidMount() {
    this.salvaFavoritas();
  }

  addFavoritas = async () => {
    const { trackId } = this.props;
    const { checked } = this.state;
    this.setState({
      loading: true,
    });
    if (checked) {
      await removeSong(trackId);
      this.setState({
        loading: false,
        checked: false,
      });
    } else {
      await addSong(trackId);
      this.setState({
        loading: false,
        checked: true,
      });
    }
  };

  salvaFavoritas = async () => {
    const favorite = await getFavoriteSongs();
    const { trackId } = this.props;
    const favoriteMusic = favorite.some((musica) => musica.trackId === trackId);
    return favoriteMusic ? this
      .setState({ checked: true }) : this.setState({ checked: false });
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { checked, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <p>
          {' '}
          {trackName}
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favoriteMusic">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favoriteMusic"
            checked={ checked }
            onChange={ this.addFavoritas }

          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
