import TextInput from "./textInput";
import NumericStepper from "./numericStepper";
import ToggleSwitch from "./toggleSwitch"
import DropDownList from "./dropDownList";
import ButtonGroup from "./multiStateButton";
import React from 'react';

export default class WallDialog extends React.Component{
    static idCounter = 0;

    cica = {id: WallDialog.idCounter++, species: "cica", text: "A cicák nagyon aranyos állatok.", size: 10, toggle: false, option: "interior", multi: 0};
    kutya = {id: WallDialog.idCounter++, species: "kutya", text: "A kutyák nagyon okos állatok.", size: 5, toggle: true, option: "exterior", multi: 2};
    delfin = {id: WallDialog.idCounter++, species: "delfin", text: "A delfinek nagyon szép állatok.", size: 20, toggle: false, option: "custom", multi: 1};

    state = {asd: [this.cica, this.kutya, this.delfin], textToShow: "", selectedId: 0};

    constructor(props){
        super(props);
    }

    findIndexById(element) {
        for(let i = 0; i < this.state.asd.length; i++) {
            if(element.id === this.state.asd[i].id) {
                return i;
            }
        }
    }

    selectAnimal(element){
        this.setState({textToShow: element.text, selectedId: this.state.asd[this.findIndexById(element)].id});
    }

    copyAnimal = () => {
        const elements = this.state.asd.slice();
        const selected = this.selectedElement;
        let copy = {id: WallDialog.idCounter++, text: selected.text, species: selected.species, size: selected.size, toggle: selected.toggle, option: selected.option, multi: selected.multi};
        this.setState({asd: elements.concat(copy)});
    };

    deleteAnimal = () => {
        let filteredArray = this.state.asd.filter((species) => {
            return species.id !== this.selectedElement.id;
        });
        this.setState({asd: filteredArray, selectedId: 0});
    };

    get selectedElement() {
        for(let i = 0; i < this.state.asd.length; i++) {
            if(this.state.asd[i].id === this.state.selectedId) {
                return this.state.asd[i];
            }
        }
    }

    render() {
        let listElement = this.state.asd.map((element) => <li key={element.id}><button onClick={() => this.selectAnimal(element)}>{element.species}</button></li>);
        let selected = this.selectedElement;

        return(
            <div id="wall-dialog">
                <div id="wall-dialog-overlay"></div>
                <div id="wall-dialog-content">
                    <h1>Wall type dialog opened</h1>
                    <ul>{listElement}</ul>
                    <TextInput text={selected.text}/>
                    <NumericStepper value={selected.size}/>
                    <ToggleSwitch isOn={selected.toggle}/>
                    <DropDownList option={selected.option}/>
                    <ButtonGroup mult={selected.multi}/>
                    <button onClick={this.copyAnimal}>Copy item</button>
                    <button onClick={this.deleteAnimal}>Delete item</button>
                    <button onClick={this.props.closeDialog}>Close dialog</button>
                </div>
            </div>
        )
    }
}