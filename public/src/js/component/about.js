import React, { Component } from 'react';
import Claim from './claim';
import { map, keys } from 'lodash';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

const DURATION = 10000,
    timeout = new WeakMap();

function next () {
    const total = keys(this.props.content).length;
    cancel.call(this);

    timeout.set(this, setTimeout(() => {
        const activeId = this.state ? this.state.activeId : 0;
        this.setState({ activeId: (activeId + 1) % total });
        next.call(this);
    }, DURATION));
}

function cancel () {
    clearTimeout(timeout.get(this));
}

export default class About extends Component {

    constructor(props) {
        super(props);
        this.state = { activeId: 0 };
    }

    componentDidMount() {
        next.call(this);
    }

    componentWillUnmount () {
        cancel.call(this);
    }

    render() {
        const { content } = this.props,
            name = keys(content)[this.state.activeId],
            text = content[name];

        return (
            <div className='page about-page'>
            <TransitionGroup
                transitionName='transitioning'
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
            
                <Claim text={ text } key={ name }></Claim>
            
            </TransitionGroup>
            </div>
        );
    }
}