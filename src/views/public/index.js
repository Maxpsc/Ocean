import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { publicPost } from './publicRedux';
import RaisedButton from 'material-ui/RaisedButton';
import MField from 'src/components/shared/MField';

class Public extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: props.username,
            title: '',
            content: '',
            hint: ''
        };
        this.setValue = this.setValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    setValue(key) {
        return (val) => {
            let nState = Object.assign({},this.state);
            nState[key] = val;
            this.setState(nState);
        };
    }
    handleSubmit() {
        let {history, uid} = this.props;
        let {username, title, content} = this.state;
        this.props.publicPost({
            uid,
            username,
            title,
            content,
            time: new Date()
        },() => {
            history.push('/');
        },(res) => {
            this.setState({hint: res.items});
        });
    }
    render() {
        const { title, content, hint } = this.state;

        const titleValid = title !== '';
        const contentValid = content !== '';
        return (
            <div className="public-box">
                <h1>Public your blog</h1>
                <MField
                    hintText="Title"
                    labelText="Title"
                    value={title}
                    required
                    onChange={this.setValue('title')}
                    fullWidth={true}
                /><br />
                <MField
                    hintText="Content"
                    labelText="Content"
                    value={content}
                    multiLine={true}
                    required
                    onChange={this.setValue('content')}
                    fullWidth={true}
                /><br /><br />
                <RaisedButton
                    label="Public!"
                    primary={true}
                    disabled={!titleValid || !contentValid}
                    onTouchTap={this.handleSubmit}
                /><span className="submit-hint">{hint}</span>
            </div>
        );
    }
};
function mapStateToProps(state) {
    // const { title, content, hint } = state.publicReducer;
    const { identity, username, uid } = state.authorityReducer;
    return {
        identity,
        username,
        uid
    };
}
function mapDispatchToProps(dispatch) {
    return {
        publicPost:bindActionCreators(publicPost, dispatch)
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Public));
