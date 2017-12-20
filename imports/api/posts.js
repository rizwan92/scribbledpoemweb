import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const PostsApi = new Mongo.Collection('posts');

Meteor.methods({
  'posts.insert'(posts) {
  return  PostsApi.insert({
      userid:posts.user_id,
      text:posts.mywriting,
      userdetail:posts.userdetail,
      likes:[],
      comments:[],
      createdAt: new Date(), // current time
    });
  },
  'posts.updatedynamic'(userid,field,value) {
      return PostsApi.update(userid,{ $set: { [field]: value } });
     },
  'posts.update'(userid,image) {
    PostsApi.update(userid, {
        $set: { image },
      });  },
  'posts.remove'(taskId) {
    PostsApi.remove(taskId);    //Logic to delete the item
  },
  'posts.check'(email,password) {
    let user = PostsApi.findOne({email,password});
    return user;
  },
  'posts.singleitem'(user) {
    let User = PostsApi.findOne({_id:user});
    return User;
  },
  'posts.like'(itemid,userid) {
    let post = PostsApi.findOne({_id:itemid});
    let likes1 = post.likes;
    likes1.push(userid);
    return PostsApi.update(itemid,{ $set: { likes : likes1 } });
  }
});
if (Meteor.isServer) {
  Meteor.publish('postsbyuserid', function userPublication(userid) {
    return PostsApi.find({userid});
  });
  Meteor.publish('allposts', function userPublication(userid) {
    return PostsApi.find();
  });
}
