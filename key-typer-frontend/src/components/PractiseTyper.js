import React, {Component} from 'react';
import {Container, Segment, Input, Button, Image} from 'semantic-ui-react';
import {paraData, timer, data} from '../paragraph-data/data.js';
import {Progress} from 'semantic-ui-react';

export default class PractiseTyper extends Component{
    
    constructor(props){
        super(props);
        let temp = data[Math.floor(Math.random()*data.length)]
        var str = temp.para;
        let rightstr = str.trim().split(/\s\s*/);
        let middstr = rightstr.shift();//a string
        this.state={
            leftstring: [],// an empty array
            middstring: middstr,//an element 
            rightstring:rightstr,//full array without midd
            timeRemaining: temp.timer, //timer left
            isStart: false,
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.startGame = this.startGame.bind(this);
        this.stopGame = this.stopGame.bind(this);
    }
    startGame(){
        if(typeof this.didPlay == 'undefined'){
            console.log('okey 1')
            this.didPlay = true
        }
        else if(this.didPlay){
            this.resetGameState()
        }
        this.setState({
            isStart: true
        }) 
        this.timerId = setInterval(()=>this.tick(),1000)
    }
    stopGame(){
        this.setState({
            isStart: false
        })
        clearInterval(this.timerId)
        delete this.timerId
    }

    resetGameState(){
        let temp = data[Math.floor(Math.random()*data.length)]
        var str = temp.para;
        let rightstr = str.trim().split(/\s\s*/);
        let middstr = rightstr.shift();//a string
        this.setState({
            leftstring: [],// an empty array
            middstring: middstr,//an element 
            rightstring:rightstr,//full array without midd
            timeRemaining: temp.timer, //timer left
            isStart: false
        })
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
                    // this.props.stopGame()
                    // console.log('whats up')
                }
            }
        }
    }

    tick(){
        if(this.state.timeRemaining === 0){
            this.stopGame();
            return;
        }

        let temp = this.state.timeRemaining-1;

        this.setState({
            timeRemaining: temp
        })
    }

    currentProgress(){
        let wordTexted = this.state.leftstring.length;
        let wordNotTexted = this.state.middstring ? this.state.rightstring.length+1 : this.state.rightstring.length;
        return (wordTexted/(wordTexted+wordNotTexted))*100;
    }

    componentDidUpdate(){
        if(this.state.isStart){
            if(this.currentProgress() == 100) this.stopGame()
        }
    }
    render(){
        let rightStrArr = this.state.rightstring;
        let middStr = this.state.middstring;
        let leftStrArr = this.state.leftstring;
        let currentProgress = this.currentProgress();
        
        return(
            <Segment padded textAlign='center'>
                <Container>
                    {!this.state.isStart &&<Button color='green' onClick={this.startGame}>Start</Button>}
                    <h3>Time : {this.state.timeRemaining}</h3>
                    {!this.state.isStart && this.didPlay &&
                    <h3>Your Speed: {this.state.leftstring.length/(timer-this.state.timeRemaining).toFixed(2)} wps</h3>
                    }
                    <Progress percent={currentProgress} autoSuccess />
                    <Segment padded style={{'font-size':'20px'}}>
                        { leftStrArr.join(' ')+ ' '} 
                        <text style={{ 'background-color': '#78FECF'}}><b>{middStr}</b></text> 
                        {' '+rightStrArr.join(' ')}
                    </Segment>
                    {this.state.isStart && 
                        <Input type="text" onKeyPress={this.handleKeyPress} />
                    }
                    {!this.state.isStart &&
                        <Input type="text" disabled onKeyPress={this.handleKeyPress}/>
                    }
                    <Image bordered style={{'margin-left': '334.5px', 'margin-top': '14px'}} src='/tenfinger-keytype.jpg' size='large'/>
                </Container>
            </Segment>
        );
    }
}
