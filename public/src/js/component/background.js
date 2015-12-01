import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Donut from './visual/donut';
import Scratch from './visual/scratch';
import Lines from './visual/lines';
import Dots from './visual/dots';

import wait from './../util/wait';
import { partial, zip, random, keys, map, times } from 'lodash';


const defaultDuration = 500,
    minItems = 10,
    maxItems = 15,
    transition = new WeakMap(),
    transitionStepClassMap = {
        enter: 'transition-enter',
        leave: 'transition-leave',
        active: 'active'
    },
    componentMap = {
        //'donut': Donut,
        'scratch': Scratch,
        //'lines': Lines,
        //'dots': Dots
    };

function getVisualConfig (width, height) {
    const x = random(width),
        y = random(height),
        rotation = random(360),
        scale = random(75, 125) / 100,
        key = [x, y, rotation].join('-');

    return { x, y, rotation, scale, key };
}

function getRandomVisuals (width, height) {
    const total = random(minItems, maxItems),
        types = keys(componentMap),
        selected = times(total, () => types[random(types.length - 1)]),
        configs = times(total, partial(getVisualConfig, width, height));

    return zip(selected, configs);
}

function setTransitionStep (step, time) {
    this.setState({ transitionStep: step });
    return wait(time || 0);
}

const enter = partial(setTransitionStep, 'enter'),
    leave = partial(setTransitionStep, 'leave'),
    activate = partial(setTransitionStep, 'active');

function animate (visuals) {
    const isActive = !! this.state.transitionStep,
        duration = this.props.transitionDuration || defaultDuration,
        inProgress = transition.get(this) || wait(0);

    transition.set(this,
        inProgress
            .then(leave.bind(this, isActive ? duration : 0))
            .then(() => this.setState({ visuals }))
            .then(wait.bind(null, 60))
            .then(enter.bind(this, duration))
            .then(activate.bind(this))
    );
}
function compose () {
    const el = ReactDOM.findDOMNode(this),
        width = el.offsetWidth,
        height = el.offsetHeight,
        visuals = getRandomVisuals(width, height);

    // set enter and leave classes
    animate.call(this, visuals);
}


export default class Background extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        compose.call(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.path !== nextProps.path) {
            compose.call(this);
        }
    }

    render() {
        return (
            <div className='background' onClick={ compose.bind(this) } >
                <div className={ transitionStepClassMap[this.state.transitionStep] || '' }>
                {
                    map(this.state.visuals, ([type, props]) =>
                        React.createElement(componentMap[type], props)
                    )
                }
                </div>
            </div>
        )
    }
};

