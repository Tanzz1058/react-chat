import React from "react";
import firebase from "../../firebase";
import "semantic-ui-css/semantic.min.css";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: [],
    loading: false,
  };
 
  isFormValid = ({ email, password }) => email && password;

  displayErrors = (error) => error.map((e, i) => <p key={i}>{e.message}</p>);

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((signedInUser) => {
          this.setState({ error: [], loading: false });
        })
        .catch((err) => {
          this.setState({
            error: this.state.error.concat(err),
            loading: false,
          });
        });
    }
  };

  handleInputError = (error, input) => {
    return error.some((error) => error.message.toLowerCase().includes(input))
      ? "error"
      : "";
  };

  render() {
    const { email, password, error, loading } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
            Login to DevChat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                className={this.handleInputError(error, "email")}
                value={email}
                type="email"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                className={this.handleInputError(error, "password")}
                value={password}
                type="password"
              />

              <Button
                disabled={loading}
                color="violet"
                fluid
                size="large"
                className={loading ? "loading" : ""}
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {error.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(this.state.error)}
            </Message>
          )}
          <Message>
            Don't have an account? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
