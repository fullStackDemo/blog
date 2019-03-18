import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time


function AuthExample() {
  return (
    <Router>
      <div>
        <AuthButton></AuthButton>
        <ul>
          <li>
            <Link to="/public">Public page</Link>
          </li>
          <li>
            <Link to="/protected">Protected page</Link>
          </li>
        </ul>
        <Route path="/public" component={Public}></Route>
        <Route path="/login" component={Login}></Route>
        <PrivateRoute path="/protected" component={Protected}></PrivateRoute>
      </div>
    </Router>
  )
}

function Public() {
  return (
    <div>Public page</div>
  )
}

function Protected() {
  return (
    <div>Protected page</div>
  )
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(({ history }) =>
  fakeAuth.isAuthenticated ?
    (
      <div>
        welcom！
    <button
          onClick={() => {
            fakeAuth.signout(() => history.push('/'))
          }}
        >Sign out</button>
      </div>
    ) : (
      <div>You are logged</div>
    )
);

function PrivateRoute({ component: Component, ...rest }) {

  return (
    <Route
      {...rest}
      render={props => (        
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      )
      }
    ></Route>
  )
}

class Login extends Component {
  state = { redirectToReferrer: false };
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };
  render() {
    console.log(this.props);
    
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}


export default AuthExample