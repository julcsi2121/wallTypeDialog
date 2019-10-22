import React from 'react';
import './App.css';

class WallDialog extends React.Component{
  constructor(props){
    super(props);
    this.state = {textToShow: ""};
  }

  cica = {species: "cica", text: "A cicák nagyon aranyos állatok."};
  kutya = {species: "kutya", text: "A kutyák nagyon okos állatok."};
  delfin = {species: "delfin", text: "A delfinek nagyon szép állatok."};

  data = [this.cica, this.kutya, this.delfin];

  selectAnimal(element){
    this.setState({textToShow: element.text});
    console.log(element.species);
  }

  listElement = this.data.map((element) => <li key={element.species}><button onClick={() => this.selectAnimal(element)}>{element.species}</button></li>);

  render() {
    return(
        <div>
          <h1>Wall type dialog opened</h1>
          <ul>{this.listElement}</ul>
          <p>{this.state.textToShow}</p>
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
