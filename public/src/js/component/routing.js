import React from 'react';
import { map, first, keys } from 'lodash';
import { PropTypes, Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

export default class Routing extends Component {
    render() {
        const { history, routes, main } = this.props,
            defComponent = routes[first(keys(routes))],
            children = map(routes, (component, name) =>
                <Route name={ name } path={ name } component={ component } key={ name } />
            );

        return (
            <Router history={ history }>
                <Route name='main' path='/' component={ main }>
                    { children }
                    <IndexRoute component={ defComponent } />
                </Route>
            </Router>
        );
    }
}