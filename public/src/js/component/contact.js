import React, { Component } from 'react';
import { map } from 'lodash';

export default class Contact extends Component {
    render() {
        const { message, email, phone, social } = this.props.content;

        return (
            <div className='page contact-page'>
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
            </div>
        );
    }
};