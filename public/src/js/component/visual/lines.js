import React, { Component } from 'react';
import { random, times } from 'lodash';


/* vertical white lines with a rounded mask inside  */
export default class Lines extends Component {
    componentWillMount() {
        this.setState({
            total: random(10, 20)
        });
    }

    render() {
        const { total } = this.state,
            { x, y } = this.props,
            style = { left: x, top: y };

        console.log(total, x, y);

        return (
            <div className='visual lines' style={ style }>
                <div className='outside'>
                {
                    times(total, () =>  <div className='line'></div>)
                }
                </div>

                <div className='inside'>
                {
                    times(total, () =>  <div className='line'></div>)
                }
                </div>
            </div>
        );
    }
};