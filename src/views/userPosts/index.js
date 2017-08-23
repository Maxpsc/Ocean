import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPosts, deletePost, editingPost, saveEditPost } from '../posts/postsRedux';
import MTable from 'src/components/shared/MTable';
import MField from 'src/components/shared/MField';

class UserPosts extends Component {
    constructor(props){
        super(props);
        this.setValue = this.setValue.bind(this);
        this.beginEdit = this.beginEdit.bind(this);
    }
    componentDidMount() {
        const { getPosts, uid } = this.props;
        getPosts({uid: uid});
    }
    setValue(key) {
        return (val) => {
            let nPost = Object.assign({},this.props.editPost);
            nPost[key] = val;
            this.props.editingPost(nPost);
        };
    }
    beginEdit(index) {
        const { editingPost, posts } = this.props;
        editingPost(posts[index]);
    }
    render() {
        let head = ['id','title','content','user','create_time'];
        let { posts, editPost, deletePost, saveEditPost, hint } = this.props;
        // console.log(posts);
        const nPosts = posts.map((post) => {
            const { id, title, content, user_name, create_time } = post;
            return {
                id,
                title,
                content,
                user_name: user_name,
                create_time: create_time
            };
        });
        return (
            <div className='list-wrap'>
                <h1>Admin posts</h1>
                <h5>{ hint }</h5>
                <MTable headList={head}
                    bodyList={nPosts}
                    deletable={false}
                    editable={false}
                    editItem={editPost}
                    editTitle="Edit Post"
                    handleDelete={deletePost}
                    handleBeginEdit={this.beginEdit}
                    handleSave={saveEditPost}
                >
                    <MField
                        hintText="Title"
                        labelText="Title"
                        value={editPost.title}
                        required
                        onChange={this.setValue('title')}
                        fullWidth={true}
                    /><br />
                    <MField
                        hintText="Content"
                        labelText="Content"
                        value={editPost.content}
                        multiLine={true}
                        required
                        onChange={this.setValue('content')}
                        fullWidth={true}
                    /><br />
                </MTable>
            </div>
        );
    }
}
function mapStateToProps(state){
    const { uid } = state.authorityReducer;
    const { posts, editPost, hint } = state.postsReducer;
    return {
        uid,
        posts,
        editPost,
        hint
    };
}
function mapDispatchToProps(dispatch){
    return {
        getPosts: bindActionCreators(getPosts,dispatch),
        deletePost: bindActionCreators(deletePost,dispatch),
        editingPost: bindActionCreators(editingPost,dispatch),
        saveEditPost: bindActionCreators(saveEditPost,dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
