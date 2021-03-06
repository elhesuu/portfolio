import React, { Component } from 'react';
import moment from 'moment';

function asDate (mmyyyy) {
	const [ month, year ] = mmyyyy.split('/');
	return new Date([ month, '01', year ].join('/'));
}

function formatPeriod (from, to) {
	const fromDate = asDate(from),
		toDate = asDate(to), 
		fromFormat = fromDate.getYear() === toDate.getYear() ? 'MMM' : 'MMM/YYYY';

	return [ moment(fromDate).format(fromFormat),
			moment(toDate).format('MMM/YYYY') ].join(' \u00B7 ');
}

export default class Role extends Component {
    render() {
    	const {  
                title,
                company,
                from,
                to,
                description,
                location
            } = this.props,
    		period = formatPeriod(from, to);

        return (
            <div className='role list-item'>
            	<h4 className='category list-item-title'>{ title }</h4>
            	<p className='period'>{ company } / { period }</p>
                <p className='location'>{ location }</p>
            	<p className='list-item-description'>{ description }</p>
            </div>
        );
    }
};