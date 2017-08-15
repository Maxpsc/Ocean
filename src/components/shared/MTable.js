import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export default class MTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            bodyList: props.bodyList,
            deleteId: '',
            deleteDialog: false
        };
        this.beginEdit = this.beginEdit.bind(this);
        this.beginDelete = this.beginDelete.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.hideDeleteDialog = this.hideDeleteDialog.bind(this);
    }
    beginEdit(index){
        console.log(index);
    }
    beginDelete(id){
        this.setState({deleteDialog: true, deleteId: id});
    }
    confirmDelete() {
        const { id } = this.state.deleteId;
        console.log('delete: '+ id);
        this.setState({deleteDialog: false});
        this.props.handleDelete(id);
    }
    hideDeleteDialog() {
        this.setState({deleteDialog: false});
    }
    render() {
        const { headList, editable, deletable } = this.props;
        const { bodyList, deleteId, deleteDialog } = this.state;

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
        let head = headList.map((item) => (
            <th key={item}>{item}</th>
        ));

        let body = bodyList.map((item,index) => {
            let props = [];
            for(let i in item){
                props.push(<td key={`${item.id}${item[i]}`}>{item[i]}</td>);
            }
            let buttons = (
                <td>
                    { editable ? <FlatButton label="Edit" primary={true} onTouchTap={this.beginEdit.bind(null,index)}/> : null }
                    { deletable ? <FlatButton label="Delete" secondary={true} onTouchTap={this.beginDelete.bind(null,item.id)}/> : null }
                </td>
            );
            return (
                <tr key={item.id}>
                    { props }
                    { (editable || deletable) ? buttons : null }
                </tr>
            );
        });
        return (
            <div className="MTable">
                <table>
                    <thead>
                        <tr>{ head }</tr>
                    </thead>
                    <tbody>
                        { body }
                    </tbody>
                </table>
                { deletable ? (
                    <Dialog
                      modal={true}
                      actions={deleteActions}
                      open={deleteDialog}
                    >
                      Are your sure to delete Id: {deleteId} ?
                    </Dialog>
                ) : null }
            </div>
        );
    }
};
