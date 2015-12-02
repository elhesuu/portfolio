import React, { Component } from 'react';
import Claim from './claim';
import Indicator from './indicator';
import { map, keys } from 'lodash';
import wait from './../util/wait';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

const DURATION = 10000,
    transitionDuration = 1000,
    timeout = new WeakMap();

function show (id) {
    const total = keys(this.props.content).length;
    cancel.call(this);
    this.setState({ activeId: id % total });
    timeout.set(this, setTimeout(next.bind(this), DURATION));
}

function next () {
    const id = this.state ? this.state.activeId + 1 : 0;
    show.call(this, id);
}

function cancel () {
    clearTimeout(timeout.get(this));
}

function handleClick (id) {
    show.call(this, id);
}

export default class About extends Component {

    constructor(props) {
        super(props);
        this.state = { activeId: -1 };
    }

    componentDidMount() {
        wait(100).then(show.bind(this, 0)); // @hack
    }

    componentWillUnmount () {
        cancel.call(this);
    }

    render() {
        const { content } = this.props,
            { activeId } = this.state,
            names = keys(content),
            name = names[activeId],
            text = content[name];

        return (
            <div className='page about-page'>
            <TransitionGroup
                transitionName='claim-transition'
                transitionEnterTimeout={ transitionDuration }
                transitionLeaveTimeout={ transitionDuration }>
            
                <Claim text={ text } key={ name }></Claim>
                <Indicator
                    total={ names.length }
                    current={ activeId }
                    handleClick={ handleClick.bind(this) } />
            
            </TransitionGroup>
            </div>
        );
    }
}