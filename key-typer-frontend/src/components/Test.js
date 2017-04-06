import React, {Component} from 'react';
import {Button,Grid} from 'semantic-ui-react';
export default class Test extends Component{
    constructor(props){
        super(props);
        this.logg = this.logg.bind(this);
        this.khongclick = this.khongclick.bind(this);
        this.state ={
            isMouseOn: false
        }
        alert('do you love me??')
    }

    logg(){
        let temp = !this.state.isMouseOn;
        this.setState({
            isMouseOn: temp
        })
    }

    khongclick(){
        alert('i love you')
    }
    render(){
        return(
            <div>{this.state.isMouseOn &&
                <div>
                    <Grid>
                        <Grid.Column floated='left' width={8}>
                            <Button color="red" onClick={this.khongclick}>Có</Button>
                        </Grid.Column>
                        <Grid.Column floated='right' width={8}>
                            <Button primary onClick={this.khongclick} onMouseOver={this.logg}>Không</Button>
                        </Grid.Column>
                    </Grid>
                </div>}
                {!this.state.isMouseOn &&
                <div>
                    <Grid>
                        <Grid.Column width={8}>
                            <Button primary onClick={this.khongclick} onMouseOver={this.logg}>Không</Button>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Button color="red" onClick={this.khongclick}>Có</Button>
                        </Grid.Column>
                    </Grid>
                </div>}
                
            </div>
        )
    }
}