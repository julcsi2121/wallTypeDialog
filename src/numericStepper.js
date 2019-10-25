import React from "react"
import "./numericStepper.css"

export default class NumericStepper extends React.Component {
    constructor(props){
        super(props);
        this.state = {num: this.props.value};
        console.log("numeric stepper created");
}

    handleChange(event){
        let number = event.target.value;
        this.setState({num: number});
        this.props.onChange(number);
    }

    componentWillReceiveProps(newProps) {
        this.setState({num: newProps.value});
    }

    render() {
        return(
            <label>
                <input type="number"
                       className="numeric-stepper"
                       value={this.state.num}
                       min={0}
                       max={100}
                       step={1}
                       onChange={(event) => this.handleChange(event)}/>
            </label>
        )
    }

}