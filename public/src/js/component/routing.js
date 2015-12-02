import React from 'react';
import { map, first, keys } from 'lodash';
import { PropTypes, Component } from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import ga from 'react-google-analytics';

function track ({ location }) {
    ga('send', 'pageview', { 'page': location.pathname });
}

ga('create', window.ANALYTICS_ID);
ga('send', 'pageview', '/');

export default class Routing extends Component {
    
    render() {
        const { history, routes, main } = this.props,
            firstPath = first(keys(routes)),
            children = map(routes, (component, name) =>
                <Route name={ name } path={ name } component={ component } key={ name } onEnter={ track } />
            );

        return (
            <Router history={ history }>
                <Route name='main' path='/' component={ main }>
                    { children }
                    <IndexRoute component={ routes[firstPath] } />
                </Route>
            </Router>
        );
    }
}// 