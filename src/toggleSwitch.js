import React from "react";
import "./toggleSwitch.css";

export default class ToggleSwitch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {isOn: this.props.isOn};
    }

    handleToggle(){
        this.setState({isOn: !this.state.isOn})
    }

    componentWillReceiveProps(newProps) {
        this.setState({isOn: newProps.isOn});
    }

    render() {
        return(
            <>
                <input
                    type="checkbox"
                    checked={this.state.isOn}
                    onChange={() => this.handleToggle()}
                    className="switchbox"
                    id={`switch-new`}
                />
                <label
                    style={{ background: this.state.isOn && '#06D6A0' }}
                    className="switchbox-label"
                    htmlFor={`switch-new`}
                >
                    <span className={`switch-button`} />
                </label>
            </>
        );
    }
}