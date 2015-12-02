import React, { Component } from 'react';
import { map } from 'lodash';
import Page from './page';
import Skill from './skill';

export default class Skills extends Component {
    render() {
        return (
            <Page name='skills'>
                <div className='skills list'>
                {
                    map(this.props.content, (skill) =>
                        <Skill {...skill} key={ skill.category }/>
                    )
                }
                </div>
            </Page>
        );
    }
};