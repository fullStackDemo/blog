import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// console.log(Router, Route, Link);


function Index() {
  return (
    <div>
      <h2>Index</h2>
    </div>
  )
}
function About() {
  return (
    <div>About</div>
  )
}
function Users({ match }) {
  return (
    <div>Users</div>
  )
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>rendering with react</Link>
        </li>
        <li>
          <Link to={`${match.url}/component`}>component</Link>
        </li>
      </ul>
      <Route path={`${match.url}/:demo`} component={Topic2}></Route>
      <Route path={`${match.url}`} exact render={() => <h2>Please select a topic</h2>}></Route>
    </div>
  )
}

function Topic2({ match }) {
  return (
    <div>{match.params.demo}</div>
  )
}


function Header() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

function AppRouter() {
  return (
    <Router>
      <div>
        <Header></Header>
        <Route exact path="/" component={Index}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/users" component={Users}></Route>
        <Route path="/topics" component={Topics}></Route>
      </div>
    </Router>
  )
}

export default AppRouter;