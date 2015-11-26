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
			moment(toDate).format('MMM/YYYY') ].join(' to ');
}

export default class Role extends Component {
    render() {
    	const { title, company, from, to, description } = this.props,
    		period = formatPeriod(from, to);

        return (
            <div className='role'>
            	<h4 className='title'>{ title }</h4>
            	<p className='period'>{ company } / { period }</p>
            	<p className='description'>{ description }</p>
            </div>
        );
    }
};