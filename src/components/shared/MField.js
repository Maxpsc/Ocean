import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

export default class MField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            valid: true,
            errorText: ''
        };
        this.changeValue = this.changeValue.bind(this);
    }
    changeValue(e) {
        const value = e.target.value;
        const { required, match, errorText, onChange } = this.props;
        const nState = {value: value};

        if(value === '' && required){
            nState.errorText = 'This field is required';
        }else if(
            !match ||
            (match[0] === '=' && value === match.substr(1))||
            (match[0] !== '=' && value.match(match))
        ){
            nState.errorText = '';
        }else{
            nState.errorText = errorText;
        }
        onChange(value);
        this.setState(nState);
    }
    render() {
        const { hintText, labelText, fullWidth, multiLine, type } = this.props;
        const { value, errorText } = this.state;
        return (
            <TextField
                hintText={hintText}
                floatingLabelText={labelText}
                type={type}
                value={value}
                errorText={errorText}
                onChange={e => this.changeValue(e)}
                fullWidth={fullWidth}
                multiLine={multiLine}
            />
        );
    }
}
MField.propTypes = {
    value:PropTypes.string.isRequired
    //hintText,labelText,type
    //match,errorText,fullWidth, multiLine
    //onChange
};
