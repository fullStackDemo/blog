import React, { Component } from 'react';
import '../less/App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Go
                    </a>
                </header>
            </div>
        );
    }

    componentWillMount() {
        console.log("11");
    }



}


export default App;
