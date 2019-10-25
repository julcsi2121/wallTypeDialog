import React from "react";
import "./dropDownList.css";

export default class DropDownList extends React.Component{
    constructor(props){
        super(props);
        this.state = {option: this.props.option};
    }

    handleChange(event){
        let selected = event.target.value;
        this.setState({option: selected});
        this.props.onChange(selected);
    }

    componentWillReceiveProps(newProps) {
        this.setState({option: newProps.option});
    }

    render() {
        return(
            <label>
                <select className="dropdown-list" value={this.state.option} onChange={(event) => this.handleChange(event)}>
                    <option value="exterior">Exterior</option>
                    <option value="interior">Interior</option>
                    <option value="custom">Custom</option>
                </select>
            </label>
        )
    }
}