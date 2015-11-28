import Background from './background';
import Nav from './nav';
import React, { Component } from 'react';
import RouteTransitionGroup from './../lib/route-transition';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <main className='main'>
                <Background
                    path={ this.props.location.pathname }
                    transitionDuration={ 500 } />
                <Nav />
                <RouteTransitionGroup component='div' className='content'
                    transitionName='transitioning'
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}
                    >
                    { this.props.children }
                </RouteTransitionGroup>
            </main>
        );
    }
};

