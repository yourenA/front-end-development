import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){
        console.log('componentDidMount')
    }
    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps')
    }
    clickImage=()=>{
        console.log(`click image`,this.refs.Image)
    }
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" onClick={this.clickImage} ref="Image"/>
                    <h2>Dai Jia Ru</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
