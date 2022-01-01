const mongoCollections = require('../config/mongoCollections');
const blogs = mongoCollections.blogs;  //create and get the bookCollection
let blogsJS = require('./blogs');  // we need use async method of books

let ObjectID = require('mongodb').ObjectID;  // MongoDB Node check if objectid is valid. https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid
let { ObjectId } = require('mongodb');


module.exports = {

  getAllReviewsOfBook: async function (blogId) {
    if (!blogId) throw 'You must provide an blogId to get';
    if (typeof blogId !== 'string' || blogId.length === 0) throw "blogId must be string type and not an empty string";
    if (!ObjectID.isValid(blogId)) throw "blogId provided is not a valid ObjectId";  //MongoDB Node check if objectid is valid. https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid
    let parsedBlogId = ObjectId(blogId);
    const blogCollection = await blogs();

    const currentBlog = await blogCollection.findOne({ _id: parsedBlogId });
    return currentBlog.comments;
  },

  getCommentByCommentId: async function (commentId) {
    if (!commentId) throw 'You must provide an commentId to get';
    if (typeof commentId !== 'string' || commentId.length === 0) throw "the commentId must be string type and not an empty string";
    if (!ObjectID.isValid(commentId)) throw "the commentId provided is not a valid ObjectId";  //MongoDB Node check if objectid is valid. https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid
    const blogCollection = await blogs();

    let retComment = {};
    let tarBlogObj = await blogCollection.findOne({ 'comments._id': ObjectId(commentId) });  // https://stackoverflow.com/questions/14040562/how-to-search-in-array-of-object-in-mongodb
    let commentList = tarBlogObj['comments'];

    for (let commment of commentList) {
      if (commment['_id'].toString() === ObjectId(commentId).toString())
        retComment = commment;
    }
    if (!retComment) throw "Cannot find comment with that commentId";

    return retComment;
  },

  createComment: async function (blogId, userThatPostedComment, comment) {
    if (!userThatPostedComment) throw "You must provide user";
    if (!comment) throw "You must provide a comment";
    if (typeof userThatPostedComment !== 'object') throw "userThatPostedComment should be an object";

    let parsedBlogId = ObjectId(blogId);
    const blogCollection = await blogs();

    const newComment = {
      _id: ObjectId(),
      userThatPostedComment: userThatPostedComment,  // object
      comment: comment,  // string
    };

    const currentBlog = await blogCollection.updateOne({ _id: parsedBlogId }, { $push: { comments: newComment } });  // add comment to blog

    // console.log(currentBlog);
    // console.log(blogsJS.getBlogByBlogId(blogId));
    return blogsJS.getBlogByBlogId(blogId);
  },

  deleteComment: async function (commentId) {
    if (!commentId) throw 'You must provide an commentId for removing';
    if (typeof commentId !== 'string' || commentId.length === 0) throw "The commentId must be string type and not an empty string";
    if (!ObjectID.isValid(commentId)) throw "The commentId provided is not a valid ObjectId";
    const blogCollection = await blogs();

    // find target Blog Obj, get blogId
    let tarBlogObj = await blogCollection.findOne({ 'comments._id': ObjectId(commentId) });
    blogId = tarBlogObj._id;
    // console.log(tarBlogObj);

    let delBlogObj = await blogCollection.updateOne({ '_id': blogId }, { $pull: { comments: { _id: ObjectID(commentId) } } });

    return blogsJS.getBlogByBlogId(tarBlogObj._id.toString());
  }
}