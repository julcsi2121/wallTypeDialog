import React from "react"

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
    }

    componentWillReceiveProps(newProps) {
        this.setState({selected: newProps.multi});
    }

    render() {
        let buttonList = this.state.buttons.map((element) => <img src={element.img} key={element.value} alt={element.alt} onClick={() => this.handleClick(element)}/>);

        return(
            <div>
                {buttonList}
            </div>
        )
    }
}