import React, { Component } from 'react';
import { random } from 'lodash';

/**
 * A line that 
 *  -> enters with width: 0, 
 *  -> transitions to width: big
 *  -> transitions to width: small|0
 *  -> exits to width: 0
 */

export default class Scratch extends Component {
    componentWillMount() {
        this.setState({
            width: random(200)
        });
    }
    render() {
        const { x, y, rotation, scale } = this.props,
            style = {
                width: this.state.width,
                left: x, 
                top: y,
                transform: `rotate(${rotation}deg) scale(${scale})`
            };

        return (
            <div className='visual scratch' style={ style }></div>
        );
    }
};