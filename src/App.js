import React from 'react';
//import './App.css';

class WallDialog extends React.Component{
  render() {
    return(
        <div>
          <h1>Wall type dialog opened</h1>
          <button onClick={this.props.toggleDialog}>Close dialog</button>
        </div>
    )
  }
}

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {isDialogOpen: false};

    this.toggleDialog = this.toggleDialog.bind(this);
  }

  toggleDialog(){
    this.setState({isDialogOpen: !this.state.isDialogOpen});
    //console.log(this.state);
  }

  render() {
    return (
        <div>
          <button onClick={this.toggleDialog}>Open wall-type dialog</button>
          {this.state.isDialogOpen ?
          <WallDialog toggleDialog={this.toggleDialog.bind(this)}/>
          : null}
        </div>
    )
  }
}

export default App;
