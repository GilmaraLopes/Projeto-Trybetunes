import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { createUser } from '../services/userAPI';
import './Login.css';
import logo from '../images/logo.png';

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
      <div className="box1">
        <div className="form-container-login">
          <img src={ logo } hover="" alt="logo" width="187.19px" height="104.89px" />
          <form className="painel">
            {/* <div data-testid="page-login" /> */}
            <input
              placeholder="Qual o seu nome?"
              className="input1"
              type="text "
              name="nome"
              value={ nome }
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
            <button
              className="botao1"
              type="button"
              onClick={ this.enableBtn }
              data-testid="login-submit-button"
              disabled={ isButtonDisable }
            >
              Entrar

            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
