import React, { Component } from 'react';
import { routes } from '../app';
import { Link } from 'react-router';
import { capitalize } from 'lodash';

export default class Nav extends Component {
    render() {
        return (
            <nav className='nav'>
            {
                routes.map(route => 
                    <Link
                        to={ `${route}` }
                        key={ route } 
                        activeClassName='active'
                        className='nav-item'>
                        { capitalize(route) }
                    </Link>
                )
            }
            </nav>
        );
    }
};