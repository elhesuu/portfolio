import { map } from 'lodash';
import React, { Component } from 'react';
import Role from './role';

export default class Career extends Component {
    render() {
        return (
            <div className='page career-page'>
                <div className='roles'>
                {
                    map(this.props.content, (item, name) =>
                        <Role {...item} key={ name } />
                    )
                }
                </div>
            </div>
        );
    }
};