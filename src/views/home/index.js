import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { homeInit } from './homeRedux';

import Banner from 'src/components/banner';
import { logout } from '../authority';

class Home extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.props.homeInit();
    }
    render() {
        console.log(this.props);
        let { identity, username, posts } = this.props;
        let postList = posts.map((post,index) => (
            <li key={index}>
                <h5>{post.title}</h5>
                <p>{post.content}</p>
                <span>{post.username} {post.time}</span>
            </li>
        ));
        return (
            <div>
                <Banner />
                <p>{
                    identity === 'guest' ? 'Please login~~' : `Hello ${username}!`
                }</p>
                <ul className="post-list">
                    {postList}
                </ul>
            </div>
        );
    }
};
function mapStateToProps(state) {
    const { identity,username } = state.authorityReducer;
    const { posts } = state.homeReducer;
    return {
        posts,
        username,
        identity
    };
}
function mapDispatchToProps(dispatch) {
    return {
        homeInit: bindActionCreators(homeInit,dispatch),
        logout: bindActionCreators(logout,dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
