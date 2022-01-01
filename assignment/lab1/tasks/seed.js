const dbConnection = require('../config/mongoConnection');
let ObjectID = require('mongodb').ObjectID;  // MongoDB Node check if objectid is valid. https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid
let { ObjectId } = require('mongodb');
const data = require('../data/');
const bcrypt = require('bcryptjs');  // other version by using 'bcryptjs'
const saltRounds = 10;  //the higher number, the longer time wil be 
const blogs = data.blogs;
const comments = data.comments;
const users = data.users;

async function main() {
  const db = await dbConnection();

  try {
    await db.dropDatabase();  //Removes the current database, deleting the associated data files.
  } catch (e) {
    console.log('no previous db instance found.');
  }

  // test1
  const u0 = await users.createUser("Patrick Hill", "graffixnyc", await bcrypt.hash('ph123', saltRounds));
  const u1 = await users.createUser("Songhan Yu", "songhany", await bcrypt.hash('ysh123', saltRounds));
  const u2 = await users.createUser("John Doe", "JOHNdoe", await bcrypt.hash('GD123', saltRounds));
  const u3 = await users.createUser("test", "TeSt", await bcrypt.hash('123', saltRounds));

  const blog0 = await blogs.createBlog(
    "My experience Teaching JavaScript",
    "This is the blog post body.. here is the actually blog post content.. blah blah blah.....",
    { _id: ObjectId(u0._id), username: u0.username },
    [
      {
        "_id": ObjectId("61294dadd90ffc066cd03bef"),
        "userThatPostedComment": { _id: ObjectId("61294dadd90ffc066cd03bee"), username: "graffixnyc" },
        "comment": "Thank you for all your wonderful comments on my blog post!",
      },
      {
        "_id": ObjectId("61296014082fe5073f9ba4f2"),
        "userThatPostedComment": { _id: ObjectId("6129617a082fe5073f9ba4f5"), username: "progman716" },
        "comment": "Very informative post!",
      }
    ]
  );


  const blog1 = await blogs.createBlog(
    "First class of 554!",
    "Yeah...I get my 1st lab in CS554",
    { _id: ObjectId(u1._id), username: u1.username },
    [
      {
        "_id": ObjectId("61294dadd90ffc066cd03bef"),
        "userThatPostedComment": { _id: ObjectId(u0._id), username: u0.username },
        "comment": "Thank you comments on my blog post!",
      }
    ]
  );


  const blog2 = await blogs.createBlog(
    "This is blog2",
    "blog2 body",
    { _id: ObjectId(u3._id), username: u3.username },
    [
      {
        "_id": ObjectId("61294dadd90ffc066cd03bef"),
        "userThatPostedComment": { _id: ObjectId(u1._id), username: u1.username },
        "comment": "Thank you !",
      }
    ]
  );

  const blog3 = await blogs.createBlog(
    "This is blog3",
    "blog3 body",
    { _id: ObjectId(u2._id), username: u2.username },
    [
      {
        "_id": ObjectId("61294dadd90ffc066cd03bef"),
        "userThatPostedComment": { _id: ObjectId(u3._id), username: u3.username },
        "comment": "Thank you !",
      }
    ]
  );

  const blog4 = await blogs.createBlog(
    "This is blog4",
    "blog4 body",
    { _id: ObjectId(u3._id), username: u3.username },
    [
      {
        "_id": ObjectId("61294dadd90ffc066cd03bef"),
        "userThatPostedComment": { _id: ObjectId(u3._id), username: u3.username },
        "comment": "Thank you !",
      }
    ]
  );

  // close database connection
  await db.serverConfig.close();
  console.log('Done seeding database');
}

main().catch((error) => {
  console.log(error);
});
