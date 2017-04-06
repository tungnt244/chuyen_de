import React, {Component} from 'react'
import Typer from './Typer'
import {Segment} from 'semantic-ui-react'
import io from 'socket.io-client';
var socket = io('http://localhost:8000/');

export default class Compete extends Component{
    constructor(props){
        super(props);
        this.state={
            roomId: this.props.params.room,
        }
        this.emitProgress = this.emitProgress.bind(this);
    }

    //update the progress in server
    emitProgress(currentProgress){
        socket.emit('update socket progress',currentProgress)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            roomId: nextProps.params.room
        })
    }

    render(){
        socket.emit('join room', this.state.roomId);
        console.log(this.state.roomId)
        return(
                <Segment padded textAlign='center'>
                    <Typer emitProgress={this.emitProgress}/>
                </Segment>
        )
    }
}