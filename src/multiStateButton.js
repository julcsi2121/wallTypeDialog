import React from "react"
import "./multiStateButton.css"

export default class ButtonGroup extends React.Component{
    constructor(props){
        super(props);
        this.state = {buttons: [{img: "icon1.png", alt: "icon1", value: 0},
                                {img: "icon2.png", alt: "icon2", value: 1},
                                {img: "icon3.PNG", alt: "icon3", value: 2},
                                {img: "icon4.PNG", alt: "icon4", value: 3}],
                      selected: this.props.multi};
    }

    handleClick(element) {
        this.setState({selected: element.value});
        console.log(element.value);
        this.props.onChange(element.value);
    }

    componentWillReceiveProps(newProps) {
        this.setState({selected: newProps.multi});
    }


    render() {
        let divStyle = {
            border: '1px solid rgb(109,89,251)',
        };

        let buttonList = this.state.buttons.map((element) =>
            <div className="image-container"
                 style={element.value === this.state.selected ? divStyle : {}}>
                <img src={element.img}
                     key={element.value}
                     className="image-to-show"
                     alt={element.alt}
                     width="25"
                     height="25"
                     onClick={() => this.handleClick(element)}/>
            </div>);

        return(
            <div>
                {buttonList}
            </div>
        )
    }
}