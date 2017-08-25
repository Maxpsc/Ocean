import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchPublic } from 'src/service/posts';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MField from 'src/components/shared/MField';
import QueueAnim from 'rc-queue-anim';

class Public extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            content: '',
            hint: '',
            dialog: false
        };
        this.setValue = this.setValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDialog = this.handleDialog.bind(this);
    }
    setValue(key) {
        return (val) => {
            let nState = Object.assign({},this.state);
            nState[key] = val;
            this.setState(nState);
        };
    }
    handleSubmit() {
        let { username, uid } = this.props;
        let { title, content } = this.state;
        fetchPublic({
            uid,
            username,
            title,
            content,
            time: new Date()
        })
        .then(res => {
            //public success => pop modal
            this.setState({dialog: true});
        })
        .catch(res => {
            this.setState({hint: res.items});
        });
    }
    handleDialog() {
        let {history} = this.props;
        history.push('/');
    }
    render() {
        const { title, content, hint, dialog } = this.state;

        const titleValid = title !== '';
        const contentValid = content !== '';
        const dialogAction = [
            <FlatButton
                label="Home"
                primary={true}
                onTouchTap={this.handleDialog}
            />
        ];
        return (
            <div className="public-box form-box">
                <QueueAnim>
                    <h1 key="title">Public your blog</h1>
                    <div key="body">
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
                            rowsMax={20}
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
                </QueueAnim>

                <Dialog
                  actions={dialogAction}
                  modal={true}
                  open={dialog}
                  onRequestClose={this.handleDialog}
                >
                  Public success!
                </Dialog>
            </div>
        );
    }
};
function mapStateToProps(state) {
    const { identity, username, uid } = state.authorityReducer;
    return {
        identity,
        username,
        uid
    };
}
export default withRouter(connect(mapStateToProps)(Public));
