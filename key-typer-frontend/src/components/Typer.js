import React, {Component} from 'react';
import {Container, Segment, Input, Button} from 'semantic-ui-react';
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
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.startType = this.startType.bind(this);
        this.stopType =this.stopType.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }
    
    resetGame(){
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

    startType(){
        this.props.startGame()
    }

    stopType(){
        this.props.stopGame()
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
                    this.props.stopGame()
                }
            }
        }
    }

    tick(){
        if(this.state.timeRemaining === 0){
            clearInterval(this.timerId)
            delete this.timerId
            this.resetGame()
            if(this.props.isStart){
                this.props.stopGame()
            }
            return;
        }

        let temp = this.state.timeRemaining-1;

        this.setState({
            timeRemaining: temp
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isStart === true && !this.timerId){
            this.timerId = setInterval(() => this.tick(), 1000);
        }
        if(nextProps.isStart === false && this.timerId){
            clearInterval(this.timerId)
            delete this.timerId
            this.resetGame()
        }
    }

    render(){
        let rightStrArr = this.state.rightstring;
        let middStr = this.state.middstring;
        let leftStrArr = this.state.leftstring;
        let currentProgress = this.currentProgress();
        if(this.props.isStart){
            this.props.emitProgress(currentProgress);
        }
        return(
            <div>
                <Container>
                    {!this.props.isStart &&<Button color='green' onClick={this.startType}>Start</Button>}
                    {this.props.isStart &&<Button color='red' onClick={this.stopType}>Stop</Button>}
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
            </div>
        );
    }
}