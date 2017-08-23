import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { fetchGet } from 'src/service/posts';

import QueueAnim from 'rc-queue-anim';

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            post:{}
        };
    }
    componentDidMount() {
        const { location } = this.props;
        fetchGet({id: location.search.slice(4)})
        .then(res => {
            this.setState({post: res.items});
        })
        .catch(err => {
            console.log(err);
        });
    }
    render(){
        const { post } = this.state;
        return(
            <div>
                <QueueAnim>
                    <h2 key="title">{post.title}</h2>
                    <p key="content">{post.content}</p>
                </QueueAnim>
            </div>
        );
    }
}

export default withRouter(Post);
