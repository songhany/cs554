const express = require('express');
const router = express.Router();
let ObjectID = require('mongodb').ObjectID;  // MongoDB Node check if objectid is valid. https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid
let { ObjectId } = require('mongodb');
const data = require('../data');
const blogData = data.blogs;
const commentData = data.comments;
const userData = data.users;
// hash password
const bcrypt = require('bcryptjs');


router.get('/logout', async (req, res) => {
  res.clearCookie('AuthUser');
  res.clearCookie('Build Session');
  req.session.destroy();
  res.json({ prompt: 'You have logged out' });
});


router.get('/', async (req, res) => {
  try {
    let skip = req.query.skip;
    let take = req.query.take;
    if (parseInt(skip) < 0 || parseInt(take) < 0) throw "query string parameters for skip and take (they should be positive numbers)";

    const blogList = await blogData.getAllBlogs(parseInt(skip), parseInt(take));
    res.json(blogList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
})


router.get('/:id', async (req, res) => {
  try {
    const blog = await blogData.getBlogByBlogId(req.params.id);
    res.status(200).json(blog);
  } catch (e) {
    res.status(404).json({ message: 'Blog not found with blogId' })
  }
})


router.post('/', async (req, res) => {
  if (req.session.isLogIn) {  //! user need to login to post a blog
    let aBlogData = req.body;

    if (!aBlogData.title || typeof aBlogData.title != 'string') {
      res.status(400).json({ error: 'You must provide blog title in string' });
      return;
    }
    if (!aBlogData.body || typeof aBlogData.body != 'string') {
      res.status(400).json({ error: 'You must provide blog body in string' });
      return;
    }
    // In the request body, you will only be sending the title and the body fields of the blog post. The userThatPosted will be populated from the currently logged in user.
    // "userThatPosted": {_id: "61294dadd90ffc066cd03bee", username: "graffixnyc"}
    // ❤ I can get userThatPosted from 'req.session.user'
    const userThatPosted = { _id: ObjectId(req.session.user._id), username: req.session.user.username };

    try {
      const { title, body } = aBlogData;
      const newBlog = await blogData.createBlog(title, body, userThatPosted);
      res.status(200).json(newBlog);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    console.log(`You don't login, please login first`);
    res.status(403).json({ error: "403: Forbidden. You don't login." });
  }
});


router.put('/:id', async (req, res) => {
  try {  // check whether the blog with that Id is exist
    const blog = await blogData.getBlogByBlogId(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Blog not found, 'PUT' fail" });
    return;
  }

  const blog = await blogData.getBlogByBlogId(req.params.id);
  //! If user A posts a blog post, user B should NOT be able to update that blog post. 
  if (req.session.isLogIn && (req.session.user._id.toString() === blog.userThatPosted._id.toString())) {
    const replacedData = req.body;

    if (!replacedData.title || !replacedData.body) {
      res.status(400).json({ error: 'You must Supply All fields' });
      return;
    }
    if (typeof replacedData.title != 'string') {
      res.status(400).json({ error: 'You must provide blog title in string type' });
      return;
    }
    if (typeof replacedData.body != 'string' || typeof replacedData.body != 'string') {
      res.status(400).json({ error: 'You must provide blog author name' });
      return;
    }

    const userThatPosted = { _id: ObjectId(req.session.user._id), username: req.session.user.username }
    replacedData.userThatPosted = userThatPosted;

    // After we have found that book
    try {
      const updatedBlog = await blogData.replaceBlog(req.params.id, replacedData);
      res.status(200).json(updatedBlog);
    } catch (e) {
      // console.log(e)
      res.status(500).json({ error: e });
    }
  } else {
    res.status(403).json({ error: "403: Forbidden. You cannot put the post, which is not posted by you" });
  }
});


router.patch('/:id', async (req, res) => {
  try {
    const blog = await blogData.getBlogByBlogId(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Blog not found, 'PATCH' fail" });
    return;
  }

  const blog = await blogData.getBlogByBlogId(req.params.id);
  //! If user A posts a blog post, user B should NOT be able to update that blog post. 
  if (req.session.isLogIn && (req.session.user._id.toString() === blog.userThatPosted._id.toString())) {
    const updatedData = req.body;
    if (!(updatedData.title || updatedData.body)) {
      res.status(400).json({ error: 'You must supply at least one field' });
      return;
    }

    let updatedObject = {};
    try {
      // compare different part
      if (updatedData.title && updatedData.title !== blog.title) {
        updatedObject.title = updatedData.title;
      }
      if (updatedData.body && updatedData.body !== blog.body) {
        updatedObject.body = updatedData.body;
      }
    } catch (e) {
      // console.log(e);
      res.status(404).json({ error: 'Patch failed' });
      return;
    }

    if (Object.keys(updatedObject).length !== 0) {  // there is updated info
      try {
        const updatedBlog = await blogData.updateBlog(req.params.id, updatedObject);
        res.status(200).json(updatedBlog);
      } catch (e) {
        res.status(500).json({ error: e });
      }
    } else {
      res.status(400).json({ error: "No fields have been changed from their initial values, so no updates have occurred." })
    }
  } else {
    res.status(403).json({ error: "403: Forbidden. You cannot patch the post, which is not posted by you" });
  }
});


// router.delete('/:id', async (req, res) => {
//   if (!req.params.id) {
//     res.status(400).json({ error: 'You must supply an blogId to delete' });
//     return;
//   }

//   try {
//     await blogData.getBlogByBlogId(req.params.id);
//   } catch(e) {
//     res.status(404).json({ error: 'Blog not found with this id' });
//     return;
//   }

//   try {
//     await blogData.deleteBlog(req.params.id);
//     res.status(200).json({ 'blogId': req.params.id, 'deleted': true });
//   } catch (e) {
//     res.status(500).json({ error: e });
//   }
// });


router.post('/:id/comments', async (req, res) => {
  if (req.session.isLogIn) {
    const aComment = req.body;
    if (!aComment.comment.trim() || typeof aComment.comment !== 'string') throw "You msut provide non-empty comment in string type";

    try {  // check blogId is valid
      const blog = await blogData.getBlogByBlogId(req.params.id);
    } catch (e) {
      res.status(400).json({ error: 'Blog that you want to add comment to not found' });
      return;
    }

    // Json is valid and comment can be created successful
    try {
      const { comment } = aComment;
      // ❤ get userThatPostedComment from 'req.session.user', since a user needs to be logged in to post a comment
      const userThatPostedComment = { _id: ObjectId(req.session.user._id), username: req.session.user.username };

      const blogThatComment = await commentData.createComment(req.params.id, userThatPostedComment, comment);  // ❤ req.params.id is blogId, blogId is a string, so we can add comments to corresponding blog 
      res.status(200).json(blogThatComment);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    console.log(`You don't login, please login first`);
    res.status(403).json({ error: "403: Forbidden. You need to login to comment" });
  }
});


router.delete('/:blogId/:commentId', async (req, res) => {  //! Will ':id' conflict with ':commentId'?  Can I use req.params.commentId to get commentId
  if (!req.params.commentId) throw "You must specify an commentId to delete";
  try {
    // console.log(req.params.blogId);
    // console.log(req.params.commentId);
    const aComment = await commentData.getCommentByCommentId(req.params.commentId);  //! I am not sure 'req.params.commentId' can get commentId
  } catch (e) {
    res.status(404).json({ error: 'Comment not found' });
    return;
  }

  const aComment = await commentData.getCommentByCommentId(req.params.commentId);
  //! If user A posts a comment, user B should NOT be able to delete that comment post. 
  if (req.session.isLogIn && (req.session.user._id.toString() === aComment.userThatPostedComment._id.toString())) {
    try {
      const updatedTarBlogObj = await commentData.deleteComment(req.params.commentId);
      res.json(updatedTarBlogObj);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res.status(403).json({ error: "403: Forbidden. You cannot delete the comment, which is not posted by you" });
  }
});


router.post('/signup', async (req, res) => {
  try {
    const { name, username, password } = req.body;
    if (!name || !username || !password) throw "You should provide name, username and password for signup";

    // hash password
    const saltRounds = 10;
    let harshedPw = await bcrypt.hash(password, saltRounds);
    // create user
    const newUser = await userData.createUser(name, username, harshedPw);
    res.status(200).json({ _id: newUser._id, name: newUser.name, username: newUser.username });  // returns the created user document (sans password)
  } catch (e) {
    res.status(500).json({ error: e });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) throw "You should provide username and password to login"
  try {
    const loginUser = await userData.getUserByUserName(username.toLowerCase());

    console.log(`Login Success with username: ${username}`);
    res.status(200).json({ _id: loginUser._id, name: loginUser.name, username: loginUser.username });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});


module.exports = router;
