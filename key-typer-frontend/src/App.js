import React, { Component } from 'react';
import {Grid,Input, Label, Menu} from 'semantic-ui-react'
import randomize from 'randomatic';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
        username:'Guest',
        progress: 0
    }
    this.changeUserName = this.changeUserName.bind(this);
    this.practiseClick = this.practiseClick.bind(this);
    this.competeClick = this.competeClick.bind(this);
  }

  practiseClick(event){
      location.assign('http://localhost:3000/practise')
  }

  changeUserName(event){
      this.setState({
        username: event.target.value
      })
  }

  competeClick(event){
      let param = randomize('Aa0',8);
      // browserHistory.push('/compete/'+param);
      location.assign('http://localhost:3000/compete/'+param)
  }

  render() {
    const activeItem  = this.state.active;
    //check if app has children
    let isChildren = this.props.children ? true: false;
    return (
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={4}>
              <Menu fluid secondary vertical>
                <Menu.Item style={{width:'auto'}}>
                  <Input value={this.state.username} onChange={this.changeUserName}/>
                </Menu.Item>
                <Menu.Item name='practise' onClick={this.practiseClick}>
                  Practise
                </Menu.Item>
                <Menu.Item name='compete' onClick={this.competeClick}>
                  Compete
                </Menu.Item>
              </Menu>
            </Grid.Column>
            <Grid.Column width={12}>
              {isChildren && React.cloneElement(this.props.children, {
                username:this.state.username, 
                progress:this.state.progress})
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

export default App;
