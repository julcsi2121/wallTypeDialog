import React from 'react';
import './App.css';
import WallDialog from './wallDialog';

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
