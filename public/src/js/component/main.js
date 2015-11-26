import Nav from './nav';
import React, { Component } from 'react';

export default class Main extends Component {
    render() {
        return (
            <main className='main'>
                <Nav />
                <div className='wrapper'>
                { this.props.children }
                </div>
            </main>
        );
    }
};