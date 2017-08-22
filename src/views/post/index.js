import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { fetchGet } from 'src/service/posts';

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            post:{}
        };
    }
    componentDidMount() {
        const { location } = this.props;
        fetchGet(location.search.slice(4))
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
                <h1>POST DETAILS</h1>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
            </div>
        );
    }
}

export default withRouter(Post);
