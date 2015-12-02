import React, { Component } from 'react';
import cx from 'classnames';

const timeout = new WeakMap();


export default class Page extends Component {

    constructor(props) {
        super(props);
        this.state = { isActive: false };
    }

    componentDidMount() {
        timeout.set(this, setTimeout(() => 
            this.setState({ isActive: true })
        , 500)); // @hack, @hack
    }

    componentWillUnmount() {
        this.setState({ isActive: false });
        clearTimeout(timeout.get(this));
    }

    render() {
        const name = [this.props.name, 'page'].join('-'),
        	classes = cx({
                [name]: true,
                'page': true,
                'is-active': this.state.isActive
            });

        return (
            <div className={ classes }>
            	{ this.props.children }
        	</div>
        );
    }
}