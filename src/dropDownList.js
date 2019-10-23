import React from "react";

export default class DropDownList extends React.Component{
    constructor(props){
        super(props);
        this.state = {option: this.props.option};
    }

    handleChange(event){
        this.setState({option: event.target.value});
    }

    componentWillReceiveProps(newProps) {
        this.setState({option: newProps.option});
    }

    render() {
        return(
            <label>Select your option
                <select value={this.state.option} onChange={(event) => this.handleChange(event)}>
                    <option value="exterior">Exterior</option>
                    <option value="interior">Interior</option>
                    <option value="custom">Custom</option>
                </select>
            </label>
        )
    }
}