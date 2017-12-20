import React, { Component } from 'react';
import Modal from '../components/Modal';
import JobsForm from '../components/JobsForm';
import moment from 'moment';
import {JobsApi} from '../../api/jobs';
import {UserApi} from '../../api/user';
import { Tracker } from 'meteor/tracker';

class JobsLayout extends Component {
  constructor(){
    super();
    this.state = {
			isModalOpen: false,
      jobs:[],
      job:null,
      condition:true,
		}
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
  }
  openModal() {
    this.setState({
      condition:true,
      job:null,
      isModalOpen: true
    })
  }
  closeModal() {
    this.setState({
      condition:true,
      job:null,
      isModalOpen: false,
    })
  }
  componentWillMount(){
      this.linkracker = Tracker.autorun(()=> {
        Meteor.subscribe("alljobs");
        Meteor.subscribe("alluser");
        let jobs = JobsApi.find().fetch();
          this.setState({jobs});
      });
  }
  componentWillUnmount(){
    this.linkracker.stop();
  }
  updateJob(job){
    this.setState({job,condition:false,isModalOpen:true})

  }
  handleDelete(id){
    let result = confirm("Want to delete?");
    if (result) {
      Meteor.call('jobs.remove',id);
      }
  }

  render() {
    return (
      <div>
      <button  className="btn btn-primary" style={{justifyContent:'flex-end'}} onClick={this.openModal}>Jobs</button>
      <Modal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          style={modalStyle}>
        {this.state.isModalOpen ? <JobsForm closeModal={this.closeModal.bind(this)} job={this.state.job} condition={this.state.condition}/> :null}
          <button style={{
           ...mainStyle.button,
           margin: 0,
           width: 'auto',
           marginTop: 10
         }} onClick={this.closeModal}>Close</button>
      </Modal>



      {
        this.state.jobs.map((job,i)=>{
        return(
          <div  className='invoice-list-div' key={i} >
            <div className="invoiceavatar" >{job.title[0]}</div>
            <div className='invoice-list-subdiv-name' onClick={this.updateJob.bind(this,job)}>{job.title}</div>
            <div className='invoice-list-subdiv-number'>{job.location}</div>
            <div className='invoice-list-subdiv-date'>{moment(job.createdAt).fromNow()}</div>
            <div onClick={this.handleDelete.bind(this,job._id)} style={{position:'relative',top:0,right:2,paddingLeft:10,paddingRight:10}}><span style={{color:'#999'}} className="glyphicon glyphicon-trash btn-lg"></span></div>
          </div>
        )
      })
      }
      </div>
    );
  }

}

export default JobsLayout;
const modalStyle = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0,0.5)'
	}
};

const mainStyle = {
	button: {
    fontWeight:600,
		backgroundColor: '#408cec',
		border: 0,
		padding: '10px 15px',
		color: '#fff',
		width: 150,
		display: 'block',
		borderRadius: 3
	}
};
