import React, { Component } from 'react';
import { compact } from 'lodash';

export default class Claim extends Component {

    render() {
        const classes = ['claim']; // and transitioning, active
        return (
            <div className={ classes }>{ this.props.text }</div>
        );
    }
}