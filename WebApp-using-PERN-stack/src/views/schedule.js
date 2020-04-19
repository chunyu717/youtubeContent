import React, { Component } from 'react';
import axios from 'axios' ;
import { connect } from 'react-redux' ;
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { Button, FormControl } from 'react-bootstrap';
import moment from 'moment'

import { addEvent } from '../actions';

class ScheduleComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
  
            random : Math.floor((Math.random() * 100) + 1),
            eventTitle: undefined , 
            endOpen: false,
            startDate : moment(new Date(), 'YYYY-MM-DD HH').add(1, 'hours') , 
            endDate : moment(new Date(), 'YYYY-MM-DD HH').add(2, 'hours')
        };

        this.handleTitleChange = this.handleTitleChange.bind(this) ; 
        this.handleStartChange = this.handleStartChange.bind(this) ; 
        this.handleEndChange = this.handleEndChange.bind(this) ; 
        this.handleEndOpenChange = this.handleEndOpenChange.bind(this) ; 
        this.disabledStartDate = this.disabledStartDate.bind(this) ; 
        this.disabledEndDate = this.disabledEndDate.bind(this) ; 
        this.handleStartOpenChange = this.handleStartOpenChange.bind(this) 
        this.submit = this.submit.bind(this) 
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {
        //if (nextProps.page_info.reload == true && nextProps.page_info.reload != this.props..page_info.reload )
        console.log( 'nextProps.page_info.reload =' + nextProps.page_info.reload ) 
        //this.forceUpdate();
        this.setState( {random : this.state.random + 1 })
    }

    handleUpload = () => {
        var me = this ; 
        const data = new FormData()
        data.append('file', me.state.selectedFile, me.state.selectedFile.name)
    
        axios.post(process.env.REACT_APP_QUOTASERVER + '/api/upload', data, {
            onUploadProgress: ProgressEvent => {
                me.setState({
                loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
              })
            },
          })
          .then(res => {
            console.log(res.statusText)
          })
    
      }

    handleselectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    handleTitleChange(e) {
        console.log('from = ' + e.target.value)
        this.setState({ eventTitle: e.target.value });
    }
    
    handleStartChange(e) {
        this.setState({ startDate: e });
    }

    handleEndChange(e) {
        this.setState({ endDate: e });
    }

    handleEndOpenChange(open) {
        this.setState({ endOpen: open });
    }

    disabledStartDate(startValue) {
        const endDate = this.state.endDate;
        if (!startValue || !endDate) {
            return false;
        }
        return startValue.valueOf() <= moment(new Date(), 'YYYY-MM-DD HH').valueOf();
    }
    
    disabledEndDate(endValue) {
        const startDate = this.state.startDate;
        if (!startDate || !endValue) {
            return false;
        }
 
        return startDate.valueOf() >= endValue.valueOf();
    }

    handleStartOpenChange(open)  {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    submit() {
        var eventDate = {
            eventTitle : this.state.eventTitle, 
            startDate : this.state.startDate.set({minute:0,second:0,millisecond:0}).format(),
            endDate : this.state.startDate.add(1, 'hours').set({minute:0,second:0,millisecond:0}).format()
        } ;
        this.props.dispatch(addEvent( eventDate) ) ;
	}

    render() {
        //var content = this.props.page_info.login ?  (
        var content = true ?  (
            <div className="container" style={{ paddingTop: '10px'}}>
                <div className="row">
                    <div style={{ width: '100%'}}>
                        <DatePicker
                            style={{minWidth: '150px', width: '45%'}}
                            disabledDate={this.disabledStartDate}
                            showTime={{format: 'HH'}}
                            format="YYYY-MM-DD HH"
                            value={this.state.startDate}
                            placeholder="Start"
                            onChange={this.handleStartChange}
                            onOpenChange={this.handleStartOpenChange}
                        />   
                        <span style={{ width: '5%' }}>{'  到  '} </span> 
                        <DatePicker
                            style={{minWidth: '150px', width: '45%' , float : 'right'}}
                            disabledDate={this.disabledEndDate}
                            showTime={{format: 'HH'}}
                            format="YYYY-MM-DD HH"
                            value={this.state.endDate}
                            placeholder="End"
                            onChange={this.handleEndChange}
                            open={this.state.endOpen}
                            onOpenChange={this.handleEndOpenChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div style={{ width: '80%'}}>
                        <FormControl style={{ width: '100%'}} type="text" placeholder="新增預約" value={this.state.eventTitle} 
                        onChange={ (e) => this.setState({ eventTitle: e.target.value}) }/>
                        {' '} 
                    </div>
                    <div style={{ width: '20%'}}>
                        <Button onClick={this.submit} style={{ width: '90%'}} >新增預約</Button>
                    </div>
                </div>
                <div className="row">
                    <div style={{margin: "auto", bgcolor: 'C0E7F3', width: '100%'}}>
                        <iframe title="goglecalender" key={this.state.random} src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23c0c0c0&amp;src=zh-tw.taiwan%23holiday%40group.v.calendar.google.com&amp;color=%23125A12&amp;src=emllrtjnpg9bhe0r1svb6d2krs%40group.calendar.google.com&amp;color=%231B887A&amp;ctz=Asia%2FTaipei" 
                        style = {{width: '100%', height: '600px'}}/>   
                    </div> 
                </div>
            </div>) : (<div className="text-center"><p> 登入才可顯示內容 !</p> </div>); 

        return (
            <div>
                {content}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return state; 
}
const Schedule = connect(mapStateToProps)(ScheduleComponent) ;

export default Schedule;
