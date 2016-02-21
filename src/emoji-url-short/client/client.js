import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';

import store from 'emoji-url-short/client/store';
import routes from 'emoji-url-short/client/routes';
import clientStyles from 'emoji-url-short/client/sass/styles.scss';

var appElement = document.getElementById('emoji-url-short');
var history = createBrowserHistory();

function renderDevtools() {
    if (process.env.NODE_ENV === 'development') {
        var Devtools = require('emoji-url-short/client/devtools');
        return <Devtools store={store} />;
    } 
}

//
// Render Town
//
ReactDOM.render((
    <div>
        <Provider store={store}>
            <Router history={history} routes={routes}/>
        </Provider>
        {renderDevtools()}
    </div>
), appElement);
