import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

export default class Album extends Component {
  state = {
    albumList: [],
    loading: true,
  };

  componentDidMount() {
    this.requestMusics();
  }

  requestMusics = async () => {
    // console.log(this.props);
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    // console.log(response);
    this.setState({
      albumList: response,
      loading: false,
    });
  };

  render() {
    const { albumList, loading } = this.state;
    // console.log(albumList);
    if (loading) {
      return <Loading />;
    }
    return (
      <>
        <Header />

        <div data-testid="page-album">

          {/* {JSON.stringify(albumList)} */}
          <p data-testid="artist-name">{albumList[0].artistName}</p>
          <p data-testid="album-name">{albumList[0].collectionName}</p>
          { albumList.map((element, index) => (
            <div key={ index }>

              { index > 0 && <MusicCard { ...element } /> }
            </div>
          ))}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
