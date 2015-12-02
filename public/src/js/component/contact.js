import React, { Component } from 'react';
import { map } from 'lodash';
import Page from './page';

export default class Contact extends Component {
    render() {
        const { message, social } = this.props.content;

        return (
            <Page name='contact'>
                <div>
                    <p className='message'>{ message }</p>

                    <div className='social'>
                    {
                        map(social, (url, name) => 
                            <a className={ `social-link icon-${name}` } 
                                href={ url }
                                key={ name }
                                target='_blank'/>
                        )
                    }
                    </div>
                </div>
            </Page>
        );
    }
};