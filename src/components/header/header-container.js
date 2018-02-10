import React from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { renderIf } from '../../lib/helper-functions/render-if';
import selections from '../../state/selections';
import fileDataState from '../../state/file-data';
import * as actions from '../../state/auth/actions';
import authState from '../../state/auth';

import FileDataForm from '../file-data/FileDataForm';
import SignInModal from '../signin-modal/signin-modal-container';
import AuthCheck from '../log-in/AuthCheck';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.renderUserName = this.renderUserName.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentWillMount() {
    this.props.initalLogin();
  }

  toggleModal() {
    if (!this.state.showModal) {
      this.setState({ showModal: true });
    }
    if (this.state.showModal) {
      this.setState({ showModal: false });
    }
  }

  logOut() {
    cookie.remove('auth');
    this.props.handleLogout();
  }


  renderUserName() {
    const { auth } = this.props;
    if (!auth.user) {
      return null;
    }
    return (
      <React.Fragment>
        <ul className="navList">
          <li>{auth.user.username}
            <ul className="navList">
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/">Home</Link></li>
              <li onClick={this.logOut}><Link to="/">Log Out</Link></li>
            </ul>
          </li>
        </ul>
      </React.Fragment>
    );
  }


  render() {
    const {
      auth,
      fileDataCreate,
      makeNewLabel,
      allFilters,
    } = this.props;
    return (
      <div className="header">
        <h1>VAM</h1>
        <ul className="navList">
          {renderIf(
          !this.props.auth.user,
            <li>
            Guest
              <ul>
                <li onClick={this.toggleModal}>Log In</li>
              </ul>
            </li>,
          )}
          {this.renderUserName()}
          <AuthCheck>

            <FileDataForm
              submitHandler={fileDataCreate}
              type="creator"
              user={auth.user}
              allLabels={allFilters}
              makeNewLabel={makeNewLabel}
            />
          </AuthCheck>

        </ul>

        {renderIf(
          this.state.showModal,
          <SignInModal toggleModal={this.toggleModal} />,
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  allFilters: selections.selectors.getAllLabels(state),
});

const mapDispatchToProps = dispatch => ({
  initalLogin: () => dispatch(actions.checkLogin()),
  makeNewLabel: label => dispatch(selections.actions.create(label)),
  handleLogout: () => dispatch(actions.authLogout()),
  fileDataCreate: fileData => dispatch(fileDataState.actions.uploadImage(fileData)),
});

Header.propTypes = {
  initalLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  fileDataCreate: PropTypes.func.isRequired,
  makeNewLabel: PropTypes.func.isRequired,
  allFilters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  auth: PropTypes.shape(authState.type),
};

Header.defaultProps = {
  auth: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);