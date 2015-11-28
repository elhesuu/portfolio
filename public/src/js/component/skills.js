import React, { Component } from 'react';
import { map } from 'lodash';
import Skill from './skill';

export default class Skills extends Component {
    render() {
        return (
            <div className='page skills-page'>
                <div className='skills list'>
                {
                    map(this.props.content, (skill) =>
                        <Skill {...skill} key={ skill.category }/>
                    )
                }
                </div>
            </div>
        );
    }
};