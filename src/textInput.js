import React from 'react';
import "./textInput.css"

export default class TextInput extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {value: this.props.text};
    }

    handleChange(event){
        let text = event.target.value;
        this.setState({value: text});
        this.props.onChange(text);
    }

    componentWillReceiveProps(newProps) {
        this.setState({value: newProps.text});
    }

    render() {
        return(
            <label>
                <input className="text-input" value={this.state.value} onChange={(event) => this.handleChange(event)}/>
            </label>
        )
    }
}