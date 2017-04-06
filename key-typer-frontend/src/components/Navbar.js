import React, {Component} from 'react';
import {Button, Form,Input, Menu, Grid} from 'semantic-ui-react';
import {browserHistory} from 'react-router';
import randomize from 'randomatic';

export default class Navbar extends Component{
    constructor(props){
        super(props);
        this.practiseClick = this.practiseClick.bind(this);
        this.changeUserName = this.changeUserName.bind(this);
        this.competeClick = this.competeClick.bind(this);
        this.state={
            tempUserName: 'Guest'
        }
    }

    practiseClick(event){
        console.log('practiseClick')
    }
    //call the callback function to update
    changeUserName(event, data){
        this.setState({
            tempUserName: data.value
        })
        this.props.createUser(data.value)
    }

    competeClick(event){
        let param = randomize('Aa0',8);
        browserHistory.push('/compete/'+param);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            tempUserName: nextProps.username
        })
    }

    render() {
        return(
                <Grid centered >
                    <Grid.Row>
                        <Menu>
                            <Menu.Item name='luyen tap'>
                                <Button primary onClick={this.practiseClick}>Luyện tập</Button>
                            </Menu.Item>
                            <Menu.Item name='thi dau'>
                                <Button secondary onClick={this.competeClick}>Thi đấu</Button>
                            </Menu.Item>
                            <Menu.Item>
                                <Form >
                                    <Form.Group widths='equal' inline>
                                        <Form.Field inline>
                                            <label> User name: </label>
                                            <Input type='text' value={this.state.tempUserName} onChange={this.changeUserName}/>
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                            </Menu.Item>
                        </Menu>
                    </Grid.Row>
                </Grid>
        )
    }
}