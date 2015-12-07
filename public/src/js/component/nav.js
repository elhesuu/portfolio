import React, { Component } from 'react';
import { routes } from '../app';
import { Link } from 'react-router';
import { capitalize } from 'lodash';
import Logo from './logo';

function toggleOpen (value) {
    this.setState({ isOpen: !! value });
}

export default class Nav extends Component {
    constructor (props) {
        super(props);
        this.state = { isOpen: false };
    }

    render() {
        const { isOpen } = this.state, 
            classes = ['nav', isOpen ? 'is-open' : ''];

        return (
            <nav className={ classes.join(' ') }>
                <Logo />
                {
                    routes
                        .filter(name => name !== 'about')
                        .map(route => 
                        <Link to={ `/${route}` } key={ route } 
                            onClick={ toggleOpen.bind(this, false) }
                            activeClassName='active'
                            className='nav-item'>
                            { capitalize(route) }
                        </Link>
                    )
                }
                <a className='nav-item' href='/cv' download>CV</a>
                <div className='nav-menu'>
                    <div className='nav-hamburger' onClick={ toggleOpen.bind(this, !this.state.isOpen) }>
                        <div className='nav-hamburger-bar'></div>
                        <div className='nav-hamburger-bar'></div>
                        <div className='nav-hamburger-bar'></div>
                    </div>
                </div>
            </nav>
        );
    }
};