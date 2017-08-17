import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPosts, deletePosts } from './postsRedux';
import MTable from 'src/components/shared/MTable';

class AdminPosts extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.props.getPosts();
    }
    render() {
        let head = ['id','title','content','user','time','operation'];

        let {posts,deletePosts} = this.props;
        console.log(posts);
        return (
            <div className='list-wrap'>
                admin posts
                <MTable headList={head}
                    bodyList={posts}
                    deletable={true}
                    editable={false}
                    handleDelete={deletePosts}
                />
            </div>
        );
    }
}
function mapStateToProps(state){
    const { posts } = state.postsReducer;
    return {
        posts
    };
}
function mapDispatchToProps(dispatch){
    return {
        getPosts: bindActionCreators(getPosts,dispatch),
        deletePosts: bindActionCreators(deletePosts,dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminPosts);
