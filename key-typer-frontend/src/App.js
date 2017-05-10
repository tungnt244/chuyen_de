import React, { Component } from 'react';
import NavBar from './components/Navbar';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
        username:'Guest',
        progress: 0
    }
    this.createUser = this.createUser.bind(this);
    
  }
  //callback function
  //update the username from the navbar
  createUser(userName){
    console.log('username', userName)
    this.setState({
      username: userName
    })
  }

  render() {
    //check if app has children
    let isChildren = this.props.children ? true: false;
    return (
      <div>
          <NavBar createUser={this.createUser} username={this.state.username}/>
            {isChildren && React.cloneElement(this.props.children, {
              username:this.state.username, 
              progress:this.state.progress})
            }
      </div>
    );
  }
}

export default App;
