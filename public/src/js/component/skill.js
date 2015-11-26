import React, { Component } from 'react';
import { compact } from 'lodash';

export default class Skill extends Component {

    render() {
        const { category, description } = this.props;

        return (
            <div className='skill'>
                <h4 className='category'>{ category }</h4>
                <p className='description'>{ description }</p>        
            </div>
        );
    }
}