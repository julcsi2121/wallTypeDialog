import TextInput from "./textInput";
import NumericStepper from "./numericStepper";
import ToggleSwitch from "./toggleSwitch"
import DropDownList from "./dropDownList";
import ButtonGroup from "./multiStateButton";
import React from 'react';
import "./wallDialog.css"

export default class WallDialog extends React.Component{
    static idCounter = 3;
    static lastSavedData = null;

    cica = {id: 0, description: "cica", type: "A cicák nagyon aranyos állatok.", price: "120", width: 10, height: 20, open: false, divide: true, icon: "interior", multi: 0};
    kutya = {id: 1, description: "kutya", type: "A kutyák nagyon okos állatok.", price: "80", width: 5, height: 10, open: true,  divide: true, icon: "exterior", multi: 2};
    delfin = {id: 2, description: "delfin", type: "A delfinek nagyon szép állatok.", price: "100", width: 20, height: 5, open: false, divide: false, icon: "custom", multi: 1};
    state = {asd: [this.cica, this.kutya, this.delfin], textToShow: "", selectedId: 0};

    constructor(props){
        super(props);
        WallDialog.idCounter = 3;
    }

    componentDidMount(){
        if(WallDialog.lastSavedData !== null){
            this.setState({asd: WallDialog.lastSavedData});
        }
    }

    findIndexById(element) {
        for(let i = 0; i < this.state.asd.length; i++) {
            if(element.id === this.state.asd[i].id) {
                return i;
            }
        }
    }

    selectAnimal(element){
        this.setState({textToShow: element.type, selectedId: this.state.asd[this.findIndexById(element)].id});
    }

    copyAnimal = () => {
        const elements = this.state.asd.slice();
        const selected = this.selectedElement;
        let copy = {id: WallDialog.idCounter++, description: selected.description, type: selected.type, price: selected.price, width: selected.width, height: selected.height, open: selected.open, divide: selected.divide, icon: selected.icon, multi: selected.multi};
        this.setState({asd: elements.concat(copy)});
    };

    deleteAnimal = () => {
        let filteredArray = this.state.asd.filter((species) => {
            return species.id !== this.selectedElement.id;
        });
        this.setState({asd: filteredArray, selectedId: 0});
    };

    saveData = () => {
        WallDialog.lastSavedData = this.state.asd.slice();
        this.props.closeDialog();
    };

    get selectedElement() {
        for(let i = 0; i < this.state.asd.length; i++) {
            if(this.state.asd[i].id === this.state.selectedId) {
                return this.state.asd[i];
            }
        }
    }

    onDescriptionChange = (newDescription) => {
        let copy = this.state.asd.slice();
        copy[this.findIndexById(this.selectedElement)].description = newDescription;
        this.setState({asd: copy});
    };

    onTypeChange = (newType) => {
        let copy = this.state.asd.slice();
        copy[this.findIndexById(this.selectedElement)].type = newType;
        this.setState({asd: copy});
    };

    onPriceChange = (newPrice) => {
        let copy = this.state.asd.slice();
        copy[this.findIndexById(this.selectedElement)].price = newPrice;
        this.setState({asd: copy});
    };

    onWidthChange = (newWidth) => {
        let copy = this.state.asd.slice();
        copy[this.findIndexById(this.selectedElement)].width = newWidth;
        this.setState({asd: copy});
    };

    onHeightChange = (newHeight) => {
        let copy = this.state.asd.slice();
        copy[this.findIndexById(this.selectedElement)].height = newHeight;
        this.setState({asd: copy});
    };

    onOpenChange = (newOpen) => {
        let copy = this.state.asd.slice();
        copy[this.findIndexById(this.selectedElement)].open = newOpen;
        this.setState({asd: copy});
    };

    onDivideChange = (newDivide) => {
        let copy = this.state.asd.slice();
        copy[this.findIndexById(this.selectedElement)].divide = newDivide;
        this.setState({asd: copy});
    };

    onIconChange = (newIcon) => {
        let copy = this.state.asd.slice();
        copy[this.findIndexById(this.selectedElement)].icon = newIcon;
        this.setState({asd: copy});
    };

    render() {
        let listElement = this.state.asd.map((element) => <div key={element.id} tabIndex="-1" className="element" onClick={() => this.selectAnimal(element)}>{element.description}</div>);
        let selected = this.selectedElement;

        return(
            <div id="wall-dialog" tabIndex="0">
                <div id="wall-dialog-overlay" tabIndex="-1"></div>
                <div id="wall-dialog-content">
                    <div id="header">
                        <h1 id="title">Wall type dialog opened</h1>
                        <button id="exit-button" onClick={this.props.closeDialog}>X</button>
                    </div>
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
                            <div className="row">
                                <label className="title">Measurements</label>
                                <NumericStepper value={selected.width} onChange={(newParam) => this.onWidthChange(newParam)}/>
                                <label>Width</label>
                                <NumericStepper value={selected.height} onChange={(newParam) => this.onHeightChange(newParam)}/>
                                <label>Height</label>
                            </div>
                            <div className="row">
                                <label className="title">Options</label>
                                <ToggleSwitch isOn={selected.open} onChange={(newParam) => this.onOpenChange(newParam)}/>
                                <label>Open</label>
                                <ToggleSwitch isOn={selected.divide} onChange={(newParam) => this.onDivideChange(newParam)}/>
                                <label>Divide</label>
                            </div>
                            <div className="row">
                                <label className="title">Materials</label>
                                <img src="red-panda1.png"/>
                                <label>Left</label>
                                <img src="red-panda2.jpg"/>
                                <label>Right</label>
                            </div>
                            <div className="row">
                                <label className="title">Appearance</label>
                                <label>Color in plan</label>
                                <label className="title">Icon</label>
                                <DropDownList option={selected.icon} onChange={(newParam) => this.onIconChange(newParam)}/>
                            </div>
                            <div className="row">
                                <label className="title">Cost</label>
                                <TextInput text={selected.price} onChange={(newParam) => this.onPriceChange(newParam)}/>
                            </div>
                            <div className="row">
                                <label className="title">Axis</label>
                                <ButtonGroup mult={selected.multi}/>
                            </div>
                        </div>
                    </div>
                    <div id="footer">
                        <button onClick={this.copyAnimal}>Copy item</button>
                        <button onClick={this.deleteAnimal}>Delete item</button>
                        <button onClick={this.props.closeDialog}>Close dialog</button>
                        <button onClick={this.saveData}>Apply</button>
                    </div>
                </div>
            </div>
        )
    }
}