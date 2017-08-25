import React, { Component } from 'react';
import { dateFormat } from 'src/service/format';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import QueueAnim from 'rc-queue-anim';

const buttonStyle = {
    margin: 6
};
export default class MTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            deleteId: '',
            deleteDialog: false,
            editDialog: false
        };
        this.beginEdit = this.beginEdit.bind(this);
        this.beginDelete = this.beginDelete.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.confirmEdit = this.confirmEdit.bind(this);
        this.hideDeleteDialog = this.hideDeleteDialog.bind(this);
        this.hideEditDialog = this.hideEditDialog.bind(this);
    }
    beginEdit(index){
        this.props.handleBeginEdit(index);
        this.setState({editDialog: true});
    }
    beginDelete(id){
        this.setState({deleteDialog: true, deleteId: id});
    }
    confirmDelete() {
        let id = this.state.deleteId;
        this.props.handleDelete(id);
        this.setState({deleteDialog: false});
    }
    confirmEdit() {
        const { handleSave, editItem } = this.props;
        let id = editItem.id || editItem.uid;
        handleSave(id, editItem);
        this.setState({editDialog: false});
    }
    hideDeleteDialog() {
        this.setState({deleteDialog: false});
    }
    hideEditDialog() {
        this.setState({editDialog: false});
    }
    render() {
        const { bodyList, headList, editable, deletable, editTitle } = this.props;
        const { deleteId, deleteDialog, editDialog } = this.state;
        const deleteActions = [
            <FlatButton
                label="Cancel"
                onTouchTap={this.hideDeleteDialog}
              />,
              <FlatButton
                label="Delete"
                secondary={true}
                onTouchTap={this.confirmDelete}
              />
        ];
        const editActions = [
            <FlatButton
                label="Cancel"
                onTouchTap={this.hideEditDialog}
              />,
              <FlatButton
                label="Save"
                primary={true}
                onTouchTap={this.confirmEdit}
              />
        ];
        let head = headList.map((item) => (
            <th key={item}>{item}</th>
        ));

        let body = bodyList.map((item,index) => {
            let props = [];
            for(let i in item){
                if(i === 'create_time'){
                    props.push(
                        <td key={`${i}-${index}`}>{ dateFormat(new Date(parseInt(item[i]))) }</td>
                    );
                }else{
                    props.push(<td key={`${i}-${index}`}>{item[i]}</td>);
                }
            }
            let buttons = (
                <td key={`buttons-${index}`}>
                    { editable ? <RaisedButton label="Edit" primary={true} style={buttonStyle} onTouchTap={this.beginEdit.bind(null,index)}/> : null }
                    { deletable ? <RaisedButton label="Delete" secondary={true} style={buttonStyle} onTouchTap={this.beginDelete.bind(null,item.id || item.uid)}/> : null }
                </td>
            );
            return (
                <tr key={item.id || item.uid}>
                    { props }
                    { (editable || deletable) ? buttons : null }
                </tr>
            );
        });
        return (
            <div className="MTable">
                <QueueAnim component="table">
                    <thead key="head">
                        <tr>{ head }</tr>
                    </thead>
                    <QueueAnim component="tbody" delay={200}>
                        { body }
                    </QueueAnim>
                </QueueAnim>
                { deletable ? (
                    <Dialog
                      modal={true}
                      actions={deleteActions}
                      open={deleteDialog}
                    >
                      Are your sure to delete Id: {deleteId} ?
                    </Dialog>
                ) : null }
                { editable ? (
                    <Dialog
                        title={editTitle}
                        modal={true}
                        actions={editActions}
                        open={editDialog}
                        autoScrollBodyContent={true}
                    >
                        { this.props.children }
                    </Dialog>
                ) : null }
            </div>
        );
    }
};
