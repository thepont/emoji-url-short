import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppHandler from 'emoji-url-short/client/components/AppHandler';
import ErrorHandler from 'emoji-url-short/client/components/ErrorHandler';
import MainPage from 'emoji-url-short/client/components/MainPage';
import OtherPage from 'emoji-url-short/client/components/OtherPage';

var routes = (
    <Route component={AppHandler} path="/">
        <IndexRoute component={MainPage} />
        <Route path="other" component={OtherPage} />
        <Route path="*" component={ErrorHandler}/>
    </Route>
);

module.exports = routes;
