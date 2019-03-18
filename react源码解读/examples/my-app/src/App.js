import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { addItem } from './actions'

class Test extends React.Component {
  constructor(props) {
    super(props);
    console.log('test', this.props);
  }
  render() {
    return (
      <div>name: {this.props.time}</div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { date: (new Date()) }
    this.handleClick = this.handleClick.bind(this)
    console.log('app store', this.props);
    this.props.addItem(999);
  }
  render() {
    return (
      <div>
        <Test ss={this.props.name} state={this.props} time={this.state.date.toLocaleTimeString()}></Test>
        <button onClick={this.handleClick}>Click here</button>
      </div>
    );
  }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  handleClick() {
    console.log(this);
  }

}

// const tem = <App name="wz" key="55">111</App>

// console.log(tem.props);

// console.log(tem._store.validated = true, Object.keys(tem._store));

// console.log(React, Component);
// console.log(tem, Object.keys(tem));



export default connect(
  ((state, ownProps) => {
    console.log('state', ownProps);
    return {
      data: state.items
    }
  }),
  (dispatch, ownProps) => {
    console.log('dispatch', ownProps);
    return {
      addItem: () => {
        dispatch(addItem(ownProps.name))
      }
    }
  }
)(App);
