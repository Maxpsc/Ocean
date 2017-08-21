import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { homeInit } from './homeRedux';
import { withRouter } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';

import Banner from 'src/components/banner';
import { logout } from '../authority';
import { dateFormat } from 'src/service/format';

class Home extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.props.homeInit();
    }
    render() {
        let { identity, username, posts, history } = this.props;
        let postList = posts.map((post,index) => (
            <li key={index}>
                <h5>{post.title}</h5>
                <p>{post.content}</p>
                <span>{post.user_name} { dateFormat(new Date(parseInt(post.create_time))) }</span>
            </li>
        ));
        return (
            <div>
                <Banner user={{identity,username}} history={history} />
                <ul className="post-list">
                    <QueueAnim>
                        {postList}
                    </QueueAnim>
                </ul>
            </div>
        );
    }
};
function mapStateToProps(state) {
    const { identity,username,uid } = state.authorityReducer;
    const { posts } = state.homeReducer;
    return {
        posts,
        username,
        identity,
        uid
    };
}
function mapDispatchToProps(dispatch) {
    return {
        homeInit: bindActionCreators(homeInit,dispatch),
        logout: bindActionCreators(logout,dispatch)
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
