import React, { Component } from "react";
import "./Landing.css";
// Redux
import { connect } from "react-redux";

class LandingPage extends Component {
  state = {
    userName: "",
    myPassword: ""
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submit = event => {
    event.preventDefault();
    // const { history } = this.props;
    this.props.submitLogin(
      this.state.userName.toLowerCase().trim(),
      this.state.myPassword.toString().toLowerCase().trim(),
      // history
    );

    this.setState({
      userName: "",
      myPassword: ""
    });
  };

  demo = () => {
    this.setState({
      userName: "briansmith",
      myPassword: "1234"
    });
  };

  componentWillMount() {
    sessionStorage.clear();
  }

  componentWillReceiveProps = (nextProps) => {
    const { history } = this.props;
    console.log(nextProps)
    if(nextProps.token) {
      console.log("token is there")
      // set token to session storage
      sessionStorage.setItem('token', nextProps.token);
      // request to api for user info and redirect
      this.props.tokenLogin(nextProps.token, history)
      // redirect to home page

    }
  }



  render = () => {
    // console.log(this.props)
    const submitForm = (this.state.userName && this.state.myPassword)

    return (
      <div className="landing-page-container">
        <h1 className="landing-title text-center">Stop Data</h1>

        <div className="landing-demo text-center" onClick={this.demo}>
          demo login
        </div>

        <div className="login-form text-center">
          <div className="landing-input-area">
            <div className="landing-label text-center">User Name</div>
            <input
              className="landing-input"
              name="userName"
              value={this.state.userName}
              onChange={this.onChange}
              placeholder="User Name"
            />
          </div>
          {this.props.errors.username && <div className='username-error'>{this.props.errors.username}</div>}
          {/* <div className='username-error'>{this.props.errors.username}</div> */}

          <div className="landing-input-area">
            <div className="landing-label text-center">Password</div>
            <input
              className="landing-input"
              name="myPassword"
              value={this.state.myPassword}
              onChange={this.onChange}
              placeholder="Password"
            />
            {this.props.errors.password && <div className='password-error'>{this.props.errors.password}</div>}
            {/* <div className="password-error">
              {this.props.errors.password}
            </div> */}
          </div>

          <button
            className="landing-login-btn btn btn-info"
            onClick={this.submit}
            disabled={!submitForm}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  };
}

// this brings in the state to display on this component
const mapStateToProps = state => {
  console.log(state)
  return {
    token: state.token,
    errors: state.errors
    // history: state.history
  };
};

const mapDispachToProps = dispach => {
  return {
    submitLogin: (userName, password) => {
      // console.log(history)
      dispach({ type: "CHECK_PASSWORD", payload: { userName, password} });
    },

    tokenLogin: (token, history) => {
      dispach({ type: "LOG_IN", payload: { token, history } })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(LandingPage);
