import React, { Component } from 'react';
import { random } from 'lodash';


export default class Donut extends Component {
    componentWillMount() {
        this.setState({
            width: random(20),
            percentage: random(25, 50)
        });
    }

    render() {
        const { x, y, rotation, scale } = this.props,
            { percentage, width } = this.state,
            containerStyle = {
                left: x, 
                top: y
            },
            donutTransform = `rotate(${rotation - 90} 50 50)`,
            donutStyle = {
                strokeWidth: width,
                //strokeDashoffset: `${ (100 - percentage) * Math.PI }%`,
            };

        return (
            <div className='visual donut' style={ containerStyle }>
                <svg width='100%' height='100%' viewBox='0 0 100 100'>
                    <circle className='donut-arc'
                        cx='50' cy='50' r='30'
                        transform={ donutTransform }
                        style={ donutStyle } />
                </svg>
            </div>
        );
    }
};