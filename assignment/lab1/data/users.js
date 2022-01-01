const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;  //create and get the blogCollection

let ObjectID = require('mongodb').ObjectID;  // MongoDB Node check if objectid is valid. https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid
let { ObjectId } = require('mongodb');


module.exports = {

  createUser: async function (name, username, password) {
    if (!name) throw "You must provide user's name";
    if (typeof name !== 'string' || name.trim().length === 0) throw "name should be string type and not an empty string";
    if (!username) throw "You must provide user's name";
    if (typeof username !== 'string' || username.trim().length === 0) throw "name should be string type and not an empty string";
    if (!password) throw "You must provide password";
    if (typeof password !== 'string' || password.trim().length === 0) throw "password should be string type and not an empty string";

    const userCollection = await users();
    // check whether username is already taken
    let sameUserNames = await userCollection.find({ username: username }).toArray();
    sameUserNames.forEach((user) => {
      if (username.toLowerCase() === user.username.toLowerCase()) {
        throw "username is already taken";
      }
    })

    // create user
    const newUser = {
      name: name,
      username: username.toLowerCase(),  // username should be not-case-sensitive
      password: password,
    };

    let insertUser = await userCollection.insertOne(newUser);
    if (insertUser.insertedCount === 0) throw "Unable create new user into database";

    return await this.getUserByUserId(insertUser.insertedId.toString());
  },


  getUserByUserId: async function (userId) {
    if (!userId || typeof userId !== 'string' || userId.trim().length === 0) throw "userId must be a non-empty string";
    if (!ObjectId.isValid(userId)) throw 'userId is not valid';

    const userCollection = await users();
    let user = await userCollection.findOne({ _id: ObjectId(userId) });

    if (!userId) throw `Cannot find user with userId: ${userId} in database`;
    user._id = user._id.toString();
    return user;
  },

  getUserByUserName: async function (userName) {
    if (!userName || typeof userName !== 'string' || userName.trim().length === 0) throw "userName must be a non-empty string";

    const userCollection = await users();
    let user = await userCollection.findOne({ username: userName });

    if (!userName) throw `Cannot find user with userName: ${userName} in database`;
    user._id = user._id.toString();
    return user;
  },

  deleteUser: async function (userId) {
    if (!userId || typeof userId !== 'string' || userId.trim().length === 0) throw "userId must be a non-empty string";
    if (!ObjectId(userId)) throw "userId is not valid";

    let parsedId = ObjectId(userId);
    const userCollection = await users();
    const deleteUser = await userCollection.deleteOne({ _id: parsedId });
    if (deleteUser.deletedCount === 0) {
      throw "Cannot delete user with userId";
    }
    return { "userId": userId, "deleted": true };
  },
};
