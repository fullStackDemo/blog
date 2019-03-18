import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

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

function ComponentWithRegex({ match }) {
  return (
    <div>
      only asc or desc is allowed: {match.params.direction}
    </div>
  )
}


function Header() {
  const activeStyle = {
    fontWeight: "bold",
    color: "red"
  };
  const activeEvent = (match, location) => {
    if (!match) return false
    // console.log(match, location);
    //只有about 添加active
    // return (match.url).indexOf('about') > -1;
    return true
  }
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" strict exact activeStyle={activeStyle} isActive={activeEvent}>Index</NavLink>
          </li>
          <li>
            <NavLink to="/about" strict activeStyle={activeStyle} isActive={activeEvent}>about</NavLink>
          </li>
          <li>
            <NavLink to="/users" strict activeStyle={activeStyle} isActive={activeEvent}>users</NavLink>
          </li>
          <li>
            <NavLink to="/topics" strict activeStyle={activeStyle} isActive={activeEvent}>topics</NavLink>
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
        <Route path="/order/:direction(asc|desc)" component={ComponentWithRegex}></Route>
      </div>
    </Router>
  )
}

export default AppRouter;