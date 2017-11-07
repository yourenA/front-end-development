import React, {Component} from 'react';
import {
    Router,
    Route,

} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'


import './App.less';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as loginAction from './actions/login';
import * as responsiveAction from './actions/responsive';
import asyncComponent from './AsyncComponent'


const Home = asyncComponent(() =>
import(/* webpackChunkName: "home" */ "./container/home/home")
)
const customHistory = createBrowserHistory()
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = ()=> {
    }

    render() {
        return (
            <Router history={customHistory}>
                            <Route exact path="/" component={Home}/>
            </Router>
        );
    }
}
function mapStateToProps(state) {
    return {
        loginState: state.login,
        responsive: state.responsive,
    };
}
function mapDispatchToProps(dispath) {
    return bindActionCreators({...loginAction,...responsiveAction}, dispath);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
