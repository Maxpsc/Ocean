import React, {Component} from 'react';
import { connect } from 'redux';

import MTable from 'src/components/shared/MTable';

class AdminPosts extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {

    }
    render() {
        let head = ['id','title','content','user'];
        let posts = [
            {
                id:1,
                title:'213',
                content:'asdasdasd',
                user:'psc'
            },
            {
                id:2,
                title:'aaaaa',
                content:'asdasdasd',
                user:'qqq'
            }
        ];

        return (
            <div className='list-wrap'>
                admin posts
                <MTable headList={head} bodyList={posts} deletable={true} editable={false} />
            </div>
        );
    }
}

export default AdminPosts;
