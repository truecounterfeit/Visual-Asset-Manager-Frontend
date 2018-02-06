import React from 'react';

class UserUpdate extends React.Component {
  constructor(props) {
    super(props);



    this.onChangeOfEmail = this.onChangeOfEmail.bind(this);
    this.onChangeOfUsername = this.onChangeOfUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: this.props.auth.user.username,
      email: this.props.auth.user.email,
    };
  }

  onChangeOfEmail(event) {
    event.preventDefault();
    this.setState({ email: event.target.value });
  }

  onChangeOfUsername(event) {
    event.preventDefault();
    this.setState({ username: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.update(Object.assign({}, this.state));
  }

  render() {
    return (
      <React.Fragment>
        <h2 className="welcomeHeader"> Welcome {this.state.username} </h2>
        <br />
        <form className="userForm" onSubmit={this.onSubmit}>
        <div className="usernameForm">
          <label
          className="usernameFormLabel"
          id="username"
          >
          change your username
          </label>
          <input
            htmlFor="username"
            value={this.state.username}
            onChange={this.onChangeOfUsername}
          />
          </div>
          <br />
          <div className="emailForm">
          <label id="email">
          change your email
          </label>
          <input
            htmlFor="email"
            value={this.state.email}
            onChange={this.onChangeOfEmail}
          />
          </div>
          <button type="submit"> submit </button>
        </form>
        <button
        type="submit"
        onClick={() => this.props.delete()}>
        delete account
        </button>
        <button type="submit" onClick={this.props.editToggle}> return </button>
      </React.Fragment>
    );
  }
}

export default UserUpdate;
