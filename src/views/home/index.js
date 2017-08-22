import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { homeInit } from './homeRedux';
import { withRouter } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';

import Banner from 'src/components/banner';
import { logout } from '../authority';
import { dateFormat } from 'src/service/format';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

class Home extends Component {
    constructor(props){
        super(props);
        this.routePost = this.routePost.bind(this);
    }
    routePost(id) {
        const { history } = this.props;
        history.push('/post?id=' + id);
    }
    componentDidMount() {
        this.props.homeInit();
    }
    render() {
        let { identity, username, posts, history } = this.props;
        let postList = posts.map((post,index) => (
            <div key={index}>
                <ListItem
                    primaryText={
                        <p>{post.title} <span style={{float:'right'}}>{post.user_name} { dateFormat(new Date(parseInt(post.create_time))) }</span></p>
                    }
                    secondaryText={
                        <p>{post.content}</p>
                    }
                    secondaryTextLines={2}
                    onClick={this.routePost.bind(null, post.id)}
                />
                <Divider />
            </div>
        ));
        return (
            <div>
                <Banner user={{identity,username}} history={history} />
                <List>
                    <QueueAnim>
                        {postList}
                    </QueueAnim>
                </List>
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
