import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Logo extends Component {
    render() {
        return (
            <Link to='/' key='/' className='logo' activeClassName='active'>
            	<span className='abbreviature'>JV</span>
            	<span className='full-word'>Jesus Vilar</span>
            </Link>
        
        );
    }
};