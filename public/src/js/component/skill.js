import React, { Component } from 'react';
import { compact } from 'lodash';

export default class Skill extends Component {

    render() {
        const { category, description } = this.props;

        return (
            <div className='skill list-item'>
                <h4 className='category list-item-title'>{ category }</h4>
                <p className='list-item-description'>{ description }</p>        
            </div>
        );
    }
}