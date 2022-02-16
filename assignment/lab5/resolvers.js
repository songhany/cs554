const bluebird = require("bluebird");
const redis = require("redis")
const client = redis.createClient();
const fetch = require('node-fetch');
const uuid = require('uuid');
const accessKey = "PMi3_IMA1Zb5wz82UVlq8VZe1DoCMELpI9uhuAO0hKA";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


// Resolvers function that's responsible for populating the data for a single field in your schema
const resolvers = {
  Query: {  
    // unsplashImages(pageNum: Int) -> [ImagePost]: You will map this route in the Unsplash REST API (Links to an external site.) in this query’s resolver function to create ImagePost objects from the results of the REST API.
    // get unsplash API photos
    unsplashImages: async (_, {pageNum}) => {
      try {
        if (!pageNum) pageNum = 0;

        const baseUrl = `https://api.unsplash.com/photos?client_id=${accessKey}`;
        const img = await fetch(`${baseUrl}&page=${pageNum}`);
        const allImgData = await img.json();
        // console.log(allImgData);
        let imgList = [];

        for (const i of allImgData) {
          // console.log(i);
          // whether the user has added the image to their bin(and also saved in Redis) or not
          const redisImg = await client.getAsync(i.id);
          let binned = false;
          if (redisImg) binned = true;  // user have binned the img

          // @userPosted represents whether this post came from the Unsplash API (false) or if it was Binterest user-posted Image Post (true)
          let imgPostObj = {
            id: i.id,
            url: i.urls.small,
            posterName: i.user.name,
            description: i.alt_description,
            userPosted: false,
            binned, binned
          }

          imgList.push(imgPostObj)
        }
        // console.log(imgList);
        return imgList;
      } catch(e) {
        console.log("unsplashImages Error in ./resolvers.js")
        console.log(e);
      }
    },

    // binnedImages -> [ImagePost]: You will go to redis to retrieve the ImagePost objects that the user has added to his/her bin
    // get binned images
    binnedImages: async () => {
      try {
        let binnedImg = await client.lrangeAsync('binned', 0, -1);  // https://redis.io/commands/LRANGE
        let imgList = [];
        for (const i of binnedImg) {
          const img = await client.getAsync(i);
          const imgPostObj = JSON.parse(img);
          // console.log(img);
          if (imgPostObj.constructor === Object && Object.entries(imgPostObj).length !== 0) {  // check whether imgPostObj is empty object
            if (imgPostObj.binned == true)
              imgList.push(imgPostObj);
          }
        }
        // console.log(imgList);
        return imgList;
      } catch (e) {
        console.log('binnedImages Error in ./resolvers.js');
        console.log(e);
      }
    },

    // userPostedImages -> [ImagePost]: You will query all images that the user has posted.
    // get user posted images
    userPostedImages: async () => {
      try {
        let postImg = await client.lrangeAsync('posted', 0, -1);  // https://redis.io/commands/LRANGE
        // console.log(postImg);
        let imgList = [];
        for (let i of postImg) {
          const img = await client.getAsync(i);
          const imgPostObj = JSON.parse(img);
          if (imgPostObj.constructor === Object && Object.entries(imgPostObj).length !== 0) {  // check whether imgPostObj is empty object
            if (imgPostObj.userPosted == true) {
              imgList.push(imgPostObj);
            }
          }
        }
        // console.log(imgList);
        return imgList;
      } catch (e) {
        console.log('userPostedImages Error in ./resolvers.js');
        console.log(e);
      }
    } 
  },

  Mutation: {
    // uploadImage(url: String!, description: String, posterName: String) -> ImagePost 
    // This mutation will create an ImagePost and will be saved in Redis.
    uploadImage: async (_, {url, description, posterName}) => {
      // create an ImagePost
      const imagePostObj = {
        id: uuid.v4(),
        url: url,
        description: description,
        posterName, posterName,
        userPosted: true,
        binned: false,
      };

      try {
        // save ImagePost in Redis
        await client.setAsync(imagePostObj.id, JSON.stringify(imagePostObj));
        await client.rpushAsync('posted', imagePostObj.id);  // Insert all the specified values at the tail of the list stored at key. https://redis.io/commands/rpush
      } catch (e) {
        console.log('uploadImage Error in ./resolvers.js');
        console.log(e);
      }
      return imagePostObj;
    },

    // updateImage(id: ID!, url: String, posterName: String, description: String, userPosted: Boolean, binned: Boolean) -> ImagePost
    // This mutation will take care of any updates that we want to perform on a particular image post
    updateImage: async (_, {id, url, posterName, description, userPosted, binned}) => {
      try {
        const updatedImagePost = {
          id: id,
          url, url,
          posterName, posterName,
          description, description,
          userPosted, userPosted,
          binned, binned
        };

        const imgInRedis = JSON.parse(await client.getAsync(id));
        // console.log("imgPost in Redis: " + await imgInRedis);
        if (binned == true) {
          if (!imgInRedis) {
            await client.setAsync(id, JSON.stringify(updatedImagePost));
            if (binned) await client.rpushAsync('binned', id);
            return updatedImagePost;
          } else {
            await client.setAsync(id, JSON.stringify(updatedImagePost));
            // 1. If this image was not previously in the cache, and the user bins it, then add it to the cache using data from React state. 
            if (binned && !imgInRedis.binned) await client.rpushAsync('binned', id);
            // 2. If an image post that came from Unsplash and was unbinned (binned set to false), you should also remove it from the cache.
            if (imgInRedis.binned && !binned) await client.lremAsync('binned', 0, id);
          }
        }
        if (userPosted == true) {
          if (!imgInRedis) {
            await client.setAsync(id, JSON.stringify(updatedImagePost));
            if (userPosted) await client.rpushAsync('binned', id);
            return updatedImagePost;
          } else {
            await client.setAsync(id, JSON.stringify(updatedImagePost));
            // 1. If this image was not previously in the cache, and the user bins it, then add it to the cache using data from React state. 
            if (userPosted && !imgInRedis.userPosted) await client.rpushAsync('posted', id);
            // 2. If an image post that came from Unsplash and was unbinned (binned set to false), you should also remove it from the cache.
            if (imgInRedis.userPosted && !userPosted) await client.lremAsync('posted', 0, id);
          }
          return updatedImagePost;
        }

        await client.delAsync(id);
        if (imgInRedis.userPosted) await client.lremAsync('posted', 0, id);
        if (imgInRedis.binned) await client.lremAsync('binned', 0, id);
        return updatedImagePost;
      } catch (e) {
        console.log('updateImage Error in ./resolvers.js');
        console.log(e);
      }
    },

    // deleteImage(id: ID!) -> ImagePost
    // Delete a user-posted Image Post from the cache.
    deleteImage: async (_, {id}) => {
      try {
        const imgInRedis = JSON.parse(await client.getAsync(id));
        await client.lremAsync('binned', 0, id);
        await client.lremAsync('posted', 0, id);
        return imgInRedis;
      } catch(e) {
        console.log('deleteImage Error in ./resolvers.js');
        console.log(e);
      }
    }
  }
}

module.exports = resolvers;