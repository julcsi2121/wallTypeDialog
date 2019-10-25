import TextInput from "./textInput";
import NumericStepper from "./numericStepper";
import ToggleSwitch from "./toggleSwitch"
import DropDownList from "./dropDownList";
import ButtonGroup from "./multiStateButton";
import React from 'react';
import "./wallDialog.css"

export default class WallDialog extends React.Component{
    static idCounter = 3;
    static lastSavedData = [];

    interior = {id: 0, description: "Interior", type: "This is an interior wall.", price: "120", width: 10, height: 20, open: false, divide: true, icon: "interior", axis: 0};
    exterior = {id: 1, description: "Exterior", type: "This is an exterior wall.", price: "80", width: 5, height: 10, open: true,  divide: true, icon: "exterior", axis: 2};
    other = {id: 2, description: "Other", type: "This is an another wall.", price: "100", width: 20, height: 5, open: false, divide: false, icon: "custom", axis: 1};
    state = {dataArray: [this.interior, this.exterior, this.other], textToShow: "", selectedId: 0};

    constructor(props){
        super(props);
        WallDialog.idCounter = 3;
    }

    componentDidMount(){
        if(WallDialog.lastSavedData.length !== 0){
            let deepCopy = [];

            for(let element of WallDialog.lastSavedData) {
                let copy = {id: element.id, description: element.description, type: element.type, price: element.price, width: element.width, height: element.height, open: element.open, divide: element.divide, icon: element.icon, axis: element.axis};
                deepCopy.push(copy);
            }

            this.setState({dataArray: deepCopy});
        }
    }

    findIndexById(element) {
        for(let i = 0; i < this.state.dataArray.length; i++) {
            if(element.id === this.state.dataArray[i].id) {
                return i;
            }
        }
    }

    selectItem(element){
        this.setState({textToShow: element.type, selectedId: this.state.dataArray[this.findIndexById(element)].id});
    }

    copyItem = () => {
        const elements = this.state.dataArray.slice();
        const selected = this.selectedElement;
        let copy = {id: WallDialog.idCounter++, description: selected.description, type: selected.type, price: selected.price, width: selected.width, height: selected.height, open: selected.open, divide: selected.divide, icon: selected.icon, axis: selected.axis};
        this.setState({dataArray: elements.concat(copy)});
    };

    deleteItem = () => {
        let filteredArray = this.state.dataArray.filter((item) => {
            return item.id !== this.selectedElement.id;
        });
        this.setState({dataArray: filteredArray, selectedId: 0});
    };

    saveData = () => {
        WallDialog.lastSavedData.length = 0;

        for(let element of this.state.dataArray) {
            let copy = {id: element.id, description: element.description, type: element.type, price: element.price, width: element.width, height: element.height, open: element.open, divide: element.divide, icon: element.icon, axis: element.axis};
            WallDialog.lastSavedData.push(copy);
        }

        this.props.closeDialog();
    };

    get selectedElement() {
        for(let i = 0; i < this.state.dataArray.length; i++) {
            if(this.state.dataArray[i].id === this.state.selectedId) {
                return this.state.dataArray[i];
            }
        }
    }

    onDescriptionChange = (newDescription) => {
        let copy = this.state.dataArray.slice();
        copy[this.findIndexById(this.selectedElement)].description = newDescription;
        this.setState({dataArray: copy});
    };

    onTypeChange = (newType) => {
        let copy = this.state.dataArray.slice();
        copy[this.findIndexById(this.selectedElement)].type = newType;
        this.setState({dataArray: copy});
    };

    onPriceChange = (newPrice) => {
        let copy = this.state.dataArray.slice();
        copy[this.findIndexById(this.selectedElement)].price = newPrice;
        this.setState({dataArray: copy});
    };

    onWidthChange = (newWidth) => {
        let copy = this.state.dataArray.slice();
        copy[this.findIndexById(this.selectedElement)].width = newWidth;
        this.setState({dataArray: copy});
    };

    onHeightChange = (newHeight) => {
        let copy = this.state.dataArray.slice();
        copy[this.findIndexById(this.selectedElement)].height = newHeight;
        this.setState({dataArray: copy});
    };

    onOpenChange = (newOpen) => {
        let copy = this.state.dataArray.slice();
        copy[this.findIndexById(this.selectedElement)].open = newOpen;
        this.setState({dataArray: copy});
    };

    onDivideChange = (newDivide) => {
        let copy = this.state.dataArray.slice();
        copy[this.findIndexById(this.selectedElement)].divide = newDivide;
        this.setState({dataArray: copy});
    };

    onIconChange = (newIcon) => {
        let copy = this.state.dataArray.slice();
        copy[this.findIndexById(this.selectedElement)].icon = newIcon;
        this.setState({dataArray: copy});
    };

    onAxisChange = (newAxis) => {
        let copy = this.state.dataArray.slice();
        copy[this.findIndexById(this.selectedElement)].axis = newAxis;
        this.setState({dataArray: copy});
    };

    render() {
        let selectedStyle = {
            background: "#6c59fb",
            color: "white",
        };

        let listElement = this.state.dataArray.map((element) => <div key={element.id} tabIndex="-1" style={element.id === this.state.selectedId ? selectedStyle : {}} className="element" onClick={() => this.selectItem(element)}>{element.description}</div>);
        let selected = this.selectedElement;

        return(
            <div id="wall-dialog" tabIndex="0">
                <div id="wall-dialog-overlay" tabIndex="-1"></div>
                <div id="wall-dialog-content">
                    <div id="header">
                        <h3 id="title">Wall types</h3>
                        <button id="exit-button" onClick={this.props.closeDialog}>X</button>
                    </div>
                    <hr></hr>
                    <div id="content-wrapper">
                        <div id="left">
                            {listElement}
                        </div>
                        <div id="right">
                            <div className="row">
                                <label className="title">Description</label>
                                <TextInput text={selected.description} onChange={(newParam) => this.onDescriptionChange(newParam)}/>
                            </div>
                            <div className="row">
                                <label className="title">Type</label>
                                <TextInput text={selected.type} onChange={(newParam) => this.onTypeChange(newParam)}/>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <label className="title">Measurements</label>
                                <div className="numeric-input">
                                    <NumericStepper value={selected.width} onChange={(newParam) => this.onWidthChange(newParam)}/>
                                    <label className="side-text">Width</label>
                                </div>
                                <div className="numeric-input">
                                    <NumericStepper value={selected.height} onChange={(newParam) => this.onHeightChange(newParam)}/>
                                    <label className="side-text">Height</label>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <label className="title">Options</label>
                                <div className="switch-input">
                                    <ToggleSwitch isOn={selected.open} onChange={(newParam) => this.onOpenChange(newParam)}/>
                                    <label className="side-text">Open</label>
                                </div>
                                <div className="switch-input">
                                    <ToggleSwitch isOn={selected.divide} onChange={(newParam) => this.onDivideChange(newParam)}/>
                                    <label className="side-text">Divide</label>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <label className="title">Materials</label>
                                <div className="image-input">
                                    <img src="red-panda1.png"/>
                                    <label className="side-text">Left</label>
                                </div>
                                <div className="image-input">
                                    <img src="red-panda2.jpg"/>
                                    <label className="side-text">Right</label>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <label className="title">Appearance</label>
                                <div id="color-picker">
                                    <img src="color.png" width="80" height="40"/>
                                    <label className="side-text">Color in plan</label>
                                </div>
                                <div id="icon-selector">
                                    <label id="title-2">Icon</label>
                                    <DropDownList option={selected.icon} onChange={(newParam) => this.onIconChange(newParam)}/>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <label className="title">Cost</label>
                                <TextInput text={selected.price} onChange={(newParam) => this.onPriceChange(newParam)}/>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <label className="title">Axis</label>
                                <div id="axis-buttons">
                                    <ButtonGroup multi={selected.axis} onChange={(newParam) => this.onAxisChange(newParam)}/>
                                </div>
                            </div>
                            <hr></hr>
                        </div>
                    </div>
                    <div id="footer">
                        <div id="footer-buttons-left">
                            <button className="footer-button" onClick={this.copyItem}>Copy item</button>
                            <button className="footer-button" onClick={this.deleteItem}>Delete item</button>
                        </div>
                        <div id="footer-buttons-right">
                            <button className="footer-button" onClick={this.props.closeDialog}>Close dialog</button>
                            <button id="apply-button" onClick={this.saveData}>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}