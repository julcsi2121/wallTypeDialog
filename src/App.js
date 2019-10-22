import React from 'react';
import './App.css';

class WallDialog extends React.Component{
  static idCounter = 0;

  cica = {id: WallDialog.idCounter++, species: "cica", text: "A cicák nagyon aranyos állatok."};
  kutya = {id: WallDialog.idCounter++, species: "kutya", text: "A kutyák nagyon okos állatok."};
  delfin = {id: WallDialog.idCounter++, species: "delfin", text: "A delfinek nagyon szép állatok."};

  state = {asd: [this.cica, this.kutya, this.delfin], textToShow: "", selectedId: null};

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
    this.setState({textToShow: element.text, selectedId: this.state.asd[this.findIndexById(element)]});
  }

  copyAnimal(element){
    const elements = this.state.asd.slice();
    const selected = this.state.asd[this.findIndexById(element)];
    let copy = {id: WallDialog.idCounter++, text: selected.text, species: selected.species}
    this.setState({asd: elements.concat(copy)});
  }

  deleteAnimal(element){
    this.setState({asd: this.state.asd.filter(function(species) {
        return species.id !== element.id;
      })});
  }



  render() {
    let listElement = this.state.asd.map((element) => <li key={element.id}><button onClick={() => this.selectAnimal(element)}>{element.species}</button></li>);

    return(
        <div>
          <h1>Wall type dialog opened</h1>
          <ul>{listElement}</ul>
          <p>{this.state.textToShow}</p>
          <button onClick={() => this.copyAnimal(this.state.selectedId)}>Copy item</button>
          <button onClick={() => this.deleteAnimal(this.state.selectedId)}>Delete item</button>
          <button onClick={this.props.closeDialog}>Close dialog</button>
        </div>
    )
  }
}

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {isDialogOpen: false};

    this.openDialog = this.openDialog.bind(this);
  }

  openDialog(){
    this.setState({isDialogOpen: true});
    //console.log(this.state);
  }

  closeDialog(){
    this.setState({isDialogOpen: false});
    //console.log(this.state);
  }

  render() {
    return (
        <div>
          <button onClick={this.openDialog}>Open wall-type dialog</button>
          {this.state.isDialogOpen ?
          <WallDialog closeDialog={this.closeDialog.bind(this)}/>
          : null}
        </div>
    )
  }
}

export default App;
