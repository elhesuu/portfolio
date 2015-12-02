import React, { Component } from 'react';
import { compact } from 'lodash';
import cx from 'classnames';

const timeout = new WeakMap();

export default class Claim extends Component {

	constructor(props) {
		super(props);
		this.state = { isActive: false };
	}

	componentDidMount() {
        timeout.set(this, setTimeout(() => 
            this.setState({ isActive: true })
        , 1000)); // @hack, @hack
    }

    componentWillUnmount() {
        this.setState({ isActive: false });
        clearTimeout(timeout.get(this));
    }

    render() {
        const classes = cx({ 'claim': true, 'is-active': this.state.isActive }) // and transitioning, active
        return (
            <div className={ classes }>{ this.props.text }</div>
        );
    }
}