import React, { Component } from "react";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";
import axios from 'axios';


const initState = {
  email:"",
  password:"",
  id:""
};

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  save = async (e) => {
    e.preventDefault();
    const { email, password, id } = this.state;

    if (email && password) {
      await axios.post(
        'http://localhost:3001/users',
        { email, password, id},
      )

      this.setState(
        { flash: { status: 'is-success', msg: 'Usuario creado correctamente' }}
      );

    } else {
      this.setState(
        { flash: { status: 'is-danger', msg: 'Por favor ingrese el usuario y la contraseña' }}
      );
    }
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  render() {
    const { email, password , id} = this.state;
    const { user } = this.props.context;

    return !(user && user.accessLevel < 1) ? (
      <Redirect to="/" />
    ) : (
      <>
        <div className="hero is-info">
          <div className="hero-body container">
            <h4 className="title">Agregar Usuario</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.save}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">ID: </label>
                <input
                  className="input"
                  type="number"
                  name="id"
                  value={id}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Usuario: </label>
                <input
                  className="input"
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Password: </label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  required
                />
              </div>
              {this.state.flash && (
                <div className={`notification ${this.state.flash.status}`}>
                  {this.state.flash.msg}
                </div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-info is-outlined is-pulled-right"
                  type="submit"
                  onClick={this.save}
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default withContext(AddUser);
