import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const JobsApi = new Mongo.Collection('jobs');

Meteor.methods({
  'jobs.insert'(jobs) {
  return  JobsApi.insert({
      title:jobs.title,
      experience:jobs.experience,
      salary:jobs.salary,
      qualification:jobs.qualification,
      location:jobs.location,
      skills:jobs.skills,
      userdetail:jobs.userdetail,
      createdAt: new Date(),
      status:1,
    });
  },
  'jobs.updatedynamic'(userid,field,value) {
      return JobsApi.update(userid,{ $set: { [field]: value } });
     },
  'jobs.update'(userid,job) {
    return JobsApi.update(userid,job);
   },
  'jobs.remove'(taskId) {
    return JobsApi.remove(taskId); 
  },
  'jobs.check'(email,password) {
    let user = JobsApi.findOne({email,password});
    return user;
  },
  'jobs.singleitem'(user) {
    let User = JobsApi.findOne({_id:user});
    return User;
  },
  'jobs.like'(itemid,userid) {
    let post = JobsApi.findOne({_id:itemid});
    let likes1 = post.likes;
    likes1.push(userid);
    return JobsApi.update(itemid,{ $set: { likes : likes1 } });
  }
});
if (Meteor.isServer) {
  Meteor.publish('jobsbyuserid', function userPublication(userid) {
    return JobsApi.find({userid});
  });
  Meteor.publish('alljobs', function userPublication(userid) {
    return JobsApi.find({}, {sort: {createdAt: -1}});
  });
}
