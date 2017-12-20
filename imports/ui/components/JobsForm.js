import React, { Component } from 'react';

class JobsForm extends Component {
  constructor(props) {
    super(props);
    if (props.condition) {
      this.state ={
        title:'',
        experience:'',
        salary:'',
        qualification:'',
        location:'',
        skills:'',
      } ;
    }else {
      this.state ={
        title:props.job.title,
        experience:props.job.experience,
        salary:props.job.salary,
        qualification:props.job.qualification,
        location:props.job.location,
        skills:props.job.skills,
        status:props.job.status,
      } ;

    }
  }

  handleUpdate(event) {
  event.preventDefault();
  const title = this.state.title.trim();
  const experience = this.state.experience.trim();
  const salary = this.state.salary.trim();
  const qualification = this.state.qualification.trim();
  const location = this.state.location.trim();
  const skills = this.state.skills.trim();
  const status = this.state.status;

  let job  = this.props.job;
  job.title = title;
  job.experience = experience;
  job.salary = salary;
  job.qualification = qualification;
  job.location = location;
  job.skills = skills;
  job.status = status;
  Meteor.call('jobs.update',job._id,job,(err,res)=>{
  if (res) {
    Bert.alert('Update Successfully', 'success', 'growl-top-right');
  }
  })
}
  handleSubmit(event) {
  event.preventDefault();
  const title = this.state.title.trim();
  const experience = this.state.experience.trim();
  const salary = this.state.salary.trim();
  const qualification = this.state.qualification.trim();
  const location = this.state.location.trim();
  const skills = this.state.skills.trim();

  const userdetail={
    name:'prakash',
    number:'8882813344',
    phon:'0771-4919018',
    email:'prakash@gmail.com',
    image:'https://res.cloudinary.com/dcr2pfgxy/image/upload/v1511698498/h7gfc7xmo939xbevsiku.png',
  }

  const  jobs = {
    title,experience,salary,qualification,location,skills,userdetail
  }
  Meteor.call('jobs.insert',jobs,(err,res)=>{
    if (res) {
      Bert.alert('Entry successfull', 'success', 'growl-top-right');
    }
  })
}
  setValue(field, event) {
  let object = {};
  object[field] = event.target.value;
  this.setState(object);
  }
  handleStatus(){
    if (parseInt(this.state.status) == 1) {
      this.setState({status:0})
    }else {
      this.setState({status:1})
    }
  }

  render() {
    return (
      <div>
        <h1>{this.props.condition ? "Job Entry" : "Job Update"}</h1>
        <form onSubmit={this.props.condition ? this.handleSubmit.bind(this): this.handleUpdate.bind(this)}>

          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" value={this.state.title}  onChange={this.setValue.bind(this, 'title')} required/>
          </div>

          <div className="form-group">
            <label>Experience</label>
            <input type="text" className="form-control" value={this.state.experience} onChange={this.setValue.bind(this, 'experience')} required/>
          </div>


          <div className="form-group">
            <label>Salary</label>
            <input type="text" className="form-control" value={this.state.salary} onChange={this.setValue.bind(this, 'salary')} required/>
          </div>


          <div className="form-group">
            <label>Qualification</label>
            <input type="text" className="form-control" value={this.state.qualification} onChange={this.setValue.bind(this, 'qualification')} required/>
          </div>


          <div className="form-group">
            <label>Location</label>
            <input type="text" className="form-control" value={this.state.location} onChange={this.setValue.bind(this, 'location')} required/>
          </div>


          <div className="form-group">
            <label>Skills</label>
            <input type="text" className="form-control" value={this.state.skills} onChange={this.setValue.bind(this, 'skills')} required/>
          </div>

          <div className="checkbox">
           <label><input type="checkbox" onChange={this.handleStatus.bind(this)}/> status {this.state.status}</label>
         </div>

          <button type="submit" className="btn btn-default">{this.props.condition ? "Submit" : "Update"}</button>
        </form>
      </div>

    );
  }

}

export default JobsForm;
