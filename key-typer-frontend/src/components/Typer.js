import React, {Component} from 'react';
import {Container, Segment, Input, Button, Modal} from 'semantic-ui-react';
import {paraData, timer} from '../paragraph-data/data.js';
import {Progress} from 'semantic-ui-react';

export default class Typer extends Component{
    
    constructor(props){
        super(props);
        var str = paraData;
        let rightstr = str.trim().split(/\s\s*/);
        let middstr = rightstr.shift();//a string
        this.state={
            leftstring: [],// an empty array
            middstring: middstr,//an element 
            rightstring:rightstr,//full array without midd
            timeRemaining: timer, //timer left
            openModal: false,
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.resetGame = this.resetGameState.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.playAgain = this.playAgain.bind(this);
    }
    
    closeModal(){
        this.setState({
            openModal : false
        })
    }

    openModal(){
        this.setState({
            openModal: true
        })
    }

    playAgain(){
        this.closeModal();
        this.resetGameState();
        this.props.startGame();
    }

    resetGameState(){
        var str = paraData;
        let rightstr = str.trim().split(/\s\s*/);
        let middstr = rightstr.shift();//a string
        this.setState({
            leftstring: [],// an empty array
            middstring: middstr,//an element 
            rightstring:rightstr,//full array without midd
            timeRemaining: timer, //timer left
        })
    }

    currentProgress(){
        let wordTexted = this.state.leftstring.length;
        let wordNotTexted = this.state.middstring ? this.state.rightstring.length+1 : this.state.rightstring.length;
        return (wordTexted/(wordTexted+wordNotTexted))*100;
    }

    handleKeyPress(e){
        let value = e.target.value;
        if(e.key === ' '){
            //if is a valid value do split, update state
            if(value===this.state.middstring){
                //prevent the space character to show in the input field after clear the previous field.
                e.preventDefault();
                let midd = this.state.middstring;
                let leftstr = this.state.leftstring;
                let rightstr = this.state.rightstring;
                //update the left
                leftstr.push(midd);
                //update the right
                midd = rightstr.shift();
                e.target.value=null;
                this.setState({
                    leftstring: leftstr,// an empty array
                    middstring: midd,//an element 
                    rightstring:rightstr,//full array without midd
                })
                if(!midd){
                    console.log('in midd')
                    this.props.setWinner()
                    // this.props.stopGame()
                    // console.log('whats up')
                }
            }
        }
    }

    tick(){
        if(this.state.timeRemaining === 0){
            this.props.stopGame();
            return;
        }

        let temp = this.state.timeRemaining-1;

        this.setState({
            timeRemaining: temp
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isStart === true && !this.timerId){
            this.playAgain()
            this.timerId = setInterval(() => this.tick(), 1000);
        }
        if(nextProps.isStart === false && this.timerId){
            clearInterval(this.timerId)
            delete this.timerId
            this.openModal()
        }
    }

    render(){
        let rightStrArr = this.state.rightstring;
        let middStr = this.state.middstring;
        let leftStrArr = this.state.leftstring;
        let currentProgress = this.currentProgress();
        let yourResult = '';
        if(this.props.isWinner){
            yourResult = 'win'
        }else{
            yourResult = 'lose' 
        }
        if(this.props.isStart){
            this.props.emitProgress(currentProgress);
        }
        return(
            <div>
                <Container>
                    {!this.props.isStart &&<Button color='green' onClick={this.props.startGame}>Start</Button>}
                    <h3>Time : {this.state.timeRemaining}</h3>
                    <Progress percent={currentProgress} autoSuccess />
                    <Segment padded>
                        { leftStrArr.join(' ')+ ' '} 
                        <b>{middStr}</b> 
                        {' '+rightStrArr.join(' ')}
                    </Segment>
                    {this.props.isStart &&
                        <Input type="text" onKeyPress={this.handleKeyPress} />
                    }{!this.props.isStart &&
                        <Input type="text" disabled onKeyPress={this.handleKeyPress}/>
                    }
                </Container>
                <Modal open={this.state.openModal} basic size='small'>
                    <Modal.Header icon='archive' content={'You ' + yourResult}></Modal.Header>
                    <Modal.Content>
                         Do you want to play again!!
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={this.closeModal}>
                            No
                        </Button>
                        <Button color='green' onClick={this.playAgain}>
                            Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}
