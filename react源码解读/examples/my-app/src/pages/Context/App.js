import React, { Component } from 'react';


const ThemeContext = React.createContext('light');
console.log(ThemeContext);


class App extends Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    )
  }
}


function Toolbar(props) {
  return (
    <div>
      <ThemeButton />
    </div>
  )
}

class ThemeButton extends Component {
  // static contextType = ThemeContext;
  render() {
    return (
      <ThemeContext.Consumer>
        {this.renderComponent}
      </ThemeContext.Consumer>
    )
    // return <button theme={this.context}>test</button>
  }
  renderComponent(value){    
    return <button theme={value}>test</button> 
  }
}

console.log(<ThemeButton></ThemeButton>);


export default App;



