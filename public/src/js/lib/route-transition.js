import React, { Component } from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import StaticContainer from 'react-static-container';
import { omit } from 'lodash';

export default class RouteTransitionGroup extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { previousPathname: null };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const prev = this.context.location.pathname,
            next = nextContext.location.pathname;

        if (next !== prev) {
          this.setState({ previousPathname: prev });
        }
    }

    render() {
        const { previousPathname } = this.state,
            props = omit(this.props, 'children');

        return (
          <TransitionGroup {...props}>
              <StaticContainer
                  key={previousPathname || this.context.location.pathname}
                  shouldUpdate={!previousPathname}
                  >
                  {this.props.children}
              </StaticContainer>
          </TransitionGroup>
        );
    }

    componentDidUpdate() {
        if (this.state.previousPathname) {
            this.setState({ previousPathname: null });
        }
    }
}

RouteTransitionGroup.contextTypes = {
    location: React.PropTypes.object
}