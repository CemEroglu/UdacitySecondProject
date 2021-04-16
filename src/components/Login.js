import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { loggedUser } from "../actions/loggedUser";
import { fakeAuthentication } from "./App";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";



class Login extends Component {
  state = {
    redirectToReferrer: false,
    loggedinUser: "",
  };
  login = () => {
    fakeAuthentication.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true,
      }));
    });
  };
  handleChange = (e) => {
    e.preventDefault();
    e.persist();
    this.setState({
      loggedinUser: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { loggedinUser } = this.state;
    const { dispatch } = this.props;

    dispatch(loggedUser(loggedinUser));
    this.login();
  };
  render() {

    const { from } = this.props.location.state || { from: { pathname: '/home' } }

    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {

      return <Redirect to={from} />;
    }
    const { name } = this.props;
    return (
      <div style={{ 'width': '500px' }} className="mt-5 ml-5 text-center">
        <div className="login-form">
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              className="login-form-controls"
            >
              <Form.Label>Select User to Login</Form.Label>
              <Form.Control as="select" onChange={(e) => this.handleChange(e)}>
                <option value="">Select</option>
                {name.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="login-btn"
              disabled={this.state.loggedinUser ? false : true}
            >
              Login
          </Button>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const uid = Object.keys(users);
  const name = uid.map((id) => users[id].name);

  return {
    name,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
