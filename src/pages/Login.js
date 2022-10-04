import React, { Component } from 'react';

// import userAPI from './services/userAPI';

export default class Login extends Component {
  state = {
    nome: '',
    isButtonDisable: true,
  };

  enableBtn = () => {
    const { nome } = this.state;
    const usuario = nome.length > 2;
    this.setState({ isButtonDisable: !usuario });
  };

  handleChange = ({ target }) => {
    console.log(target);
    this.setState({
      [target.name]: target.value,
    }, () => this.enableBtn());
  };

  render() {
    const { nome, isButtonDisable } = this.state;
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
            onClick={ this.createUser }
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
