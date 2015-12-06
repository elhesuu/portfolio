import Background from './background';
import Nav from './nav';
import React, { Component } from 'react';
import cx from 'classnames';
import RouteTransitionGroup from './../lib/route-transition';
import { Initializer as GoogleAnalyticsInitializer} from 'react-google-analytics';


const timeouts = new WeakMap(),
    transitionDuration = 1000;

function setIsTransitioning() {
    clearTimeout(timeouts.get(this));
    this.setState({ isTransitioning: true });
    timeouts.set(this, setTimeout(() => {
        this.setState({
            isTransitioning: false
    });
    }, 1200));
}

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPath: null,
            isTransitioning: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const { pathname: next } = nextProps.location,
            { pathname: current } = this.props;

        if (next !== current) {
            setIsTransitioning.call(this);
        }


    }

    render() {
        const classNames = cx({
            'main': true,
            'is-transitioning': this.state.isTransitioning
        });

        return (
            <main className={ classNames }>
                <Background
                    path={ this.props.location.pathname }
                    transitionDuration={ 500 } />
                <Nav />
                <RouteTransitionGroup component='div' className='content'
                    transitionName='page-transition'
                    transitionEnterTimeout={transitionDuration}
                    transitionLeaveTimeout={transitionDuration}
                    >
                    { this.props.children }
                </RouteTransitionGroup>
                <GoogleAnalyticsInitializer />
            </main>
        );
    }
};

