import React, { Component } from 'react';

export default class Banner extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="banner">
                <h1>Welcome to MicroBlog!</h1>
            </div>
        );
    }
};
