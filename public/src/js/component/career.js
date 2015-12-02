import { map } from 'lodash';
import React, { Component } from 'react';
import Page from './page';
import Role from './role';

export default class Career extends Component {
    render() {
        return (
            <Page name='skills'>
            <div className='roles list'>
            {
                map(this.props.content, (item, name) =>
                    <Role {...item} key={ name } />
                )
            }
            </div>
            </Page>
        );
    }
};