import React, {Component} from 'react'
import Typer from './Typer'
import {Segment} from 'semantic-ui-react'
import io from 'socket.io-client';
import RecordTable from './RecordTable'

export default class Compete extends Component{
    constructor(props){
        super(props);
        this.state={
            roomId: this.props.params.room,
            clientList: {},
            isStart: false
        }
        this.emitProgress = this.emitProgress.bind(this);
        this.emitStartGame = this.emitStartGame.bind(this);
        this.emitStopGame = this.emitStopGame.bind(this);
    }

    //update the progress in server
    emitProgress(currentProgress){
        if(this.socket){
            this.socket.emit('update socket progress',currentProgress, this.state.roomId)
        }
    }

    emitStopGame(){
        console.log('in emit stop')
        if(this.socket)
            this.socket.emit('stop game room', this.state.roomId);
    }

    emitStartGame(){
        console.log('in emit start')
        if(this.socket)
            this.socket.emit('start game room', this.state.roomId)
    }

    componentWillReceiveProps(nextProps){
        if(this.state.roomId){
            this.socket.emit('leave room', this.state.roomId);
        }
        this.setState({
            roomId: nextProps.params.room
        })
    }

    render(){
        return(
                <Segment padded textAlign='center'>
                    <Typer isStart={this.state.isStart} stopGame={this.emitStopGame} startGame={this.emitStartGame} emitProgress={this.emitProgress}/>
                    {this.socket && <RecordTable thisSocket={this.socket.id} clientList={this.state.clientList}/>}
                </Segment>
        )
    }

    componentDidMount(){
        console.log(this.state)
        if(this.props.params){
            this.socket = io('http://localhost:8000/');
            this.socket.emit('join room', this.state.roomId);
        }

        this.socket.on('receive clientlist', clientList => {
            console.log('receive',clientList);
            this.setState({
                clientList: clientList
            })
        })

        this.socket.on('start game', () => {
            console.log('on listen to start')
            this.setState({
                isStart: true
            })
        })

        this.socket.on('stop game', () => {
            console.log('on stop listen')
            this.setState({
                isStart: false
            })
        })
    }
}