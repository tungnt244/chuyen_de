import React, {Component} from 'react'
import _ from 'lodash'
import {Progress} from 'semantic-ui-react'
export default class RecordTable extends Component{
    constructor(props){
        super(props)
        this.state = {
            clientList : this.props.clientList
        }
        this.renderUserTable = this.renderUserTable.bind(this);
    }

    renderUserTable(percentUN, socketId){
        if(this.props.thisSocket == socketId) return (<span/>)
        return(
            <span>
                {percentUN.username}
                <Progress size='small' percent={percentUN.percent} autoSuccess />
            </span>
        )
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            clientList: nextProps.clientList
        })
    }

    render(){
        if(!this.state.clientList){
            return <div/>
        }
        return(
            <div>
                {_.map(this.state.clientList,(value, key) => this.renderUserTable(value, key))}
            </div>
        )
    }
}