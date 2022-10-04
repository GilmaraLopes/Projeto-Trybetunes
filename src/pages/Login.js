import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    nome: '',
    isButtonDisable: true,
    loading: false,
  };

  enableBtn = () => {
    const { nome } = this.state;
    const { history } = this.props;
    this.setState({ loading: true }, async () => {
      await createUser({ name: nome });
      history.push('/search');
    });
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
      isButtonDisable: (target.value.length <= 2),
    });
  };

  render() {
    const { nome, isButtonDisable, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (

      <form>
        <div data-testid="page-login" />
        <label htmlFor="login-usuario">
          Nome:
          <input
            type="text "
            name="nome"
            value={ nome }
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            onClick={ this.enableBtn }
            data-testid="login-submit-button"
            disabled={ isButtonDisable }
          >
            Entrar

          </button>
        </label>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
