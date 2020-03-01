import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './components/Home/App';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                {/* <Route path='/404' component={NotFound} />
                <Route path='/admin' component={Admin} /> */}
                <Route component={App} />
            </Switch>
        </div>
    </Router>
    
    
    
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
