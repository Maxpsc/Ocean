import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { fetchGet } from 'src/service/posts';
import markdown from 'src/service/markdown';
import { dateFormat } from 'src/service/format';

import QueueAnim from 'rc-queue-anim';

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            post:{}
        };
        this.createMarkdown = this.createMarkdown.bind(this);
    }
    createMarkdown(text) {
        return {
            __html: markdown(text)
        };
    }
    componentWillMount() {
        const { location } = this.props;
        fetchGet({id: location.search.slice(4)})
        .then(res => {
            res.items.create_time = parseInt(res.items.create_time);
            this.setState({post: res.items});
        })
        .catch(err => {
            console.log(err);
        });
    }
    render(){
        const { post } = this.state;
        return(
            <div className="post-box">
                <QueueAnim>
                    <div key="author" className="author">
                        <h1>{post.title}</h1>
                        <h3>{post.user_name} 发布于 {dateFormat(new Date(post.create_time))}</h3>
                    </div>
                    <div key="content" className="markdown" dangerouslySetInnerHTML={this.createMarkdown(post.content)}></div>
                </QueueAnim>
            </div>
        );
    }
}

export default withRouter(Post);
