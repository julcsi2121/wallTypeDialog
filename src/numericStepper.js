import React from "react"

export default class NumericStepper extends React.Component {
    constructor(props){
        super(props);
        this.state = {size: this.props.value};
        console.log("numeric stepper created");
}

    handleChange(event){
        this.setState({size: event.target.value});
    }

    componentWillReceiveProps(newProps) {
        this.setState({size: newProps.value});
    }

    render() {
        return(
            <label>Size:
                <input type="number" value={this.state.size} min={0} max={100} step={1} onChange={(event) => this.handleChange(event)}/>
            </label>
        )
    }

}