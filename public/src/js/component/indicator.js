import React, { Component } from 'react';
import { times, partial } from 'lodash';

export default class Indicator extends Component {
    render() {
    	const { total, current, handleClick } = this.props;

        return (
            <div className='indicator'>
                    {
                        times(total, index =>
                            <div key={ index }
                                className={ `indicator-item ${ index === current ? 'active' : ''}` }
                                onClick={ partial(handleClick, index) } />
                        )
                    }
            </div>
        )
    }
};