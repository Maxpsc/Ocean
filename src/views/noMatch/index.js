import React, {Component} from 'react';

class NoMatch extends Component {
    constructor(){
        super();
    }
    render() {
        return (
            <div className='form-box'>
                <h1>404 Not Found!</h1>
            </div>
        );
    }
};
module.exports = NoMatch;
