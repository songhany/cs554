# TV Maze - React Native

  

This application uses [TV Maze API](https://www.tvmaze.com/api)
Please follow respective Environment setup to avoid build failure

# Table Of Content
[Environment Setup](#env)

[Running on Android ( Method 1 )](#android1)

[Running on Android ( Method 2)](#android2)

[Running on IOS ( Method 1 )](#ios1)

[Running on IOS ( Method 2 )](#ios2)
  
  <a name="env"> </a>
# Environment setup
**THIS IS NOT OPTIONAL**
- Head over to [Environment Setup](https://reactnative.dev/docs/environment-setup)

- ![Env image](/markdown/env.jpg)
  <a name="android1"> </a>
# Running on Android Option 1

-  **IMPORTANT** : Make sure your environment is ready.
```
 Pull the repository
 npm install
 npx react-native run-android
```
Try option 2 if this one fails

  <a name="android2"> </a>
# Running on Android Option 2

-  **IMPORTANT** : Make sure your environment is ready. 
- Install React-native cli beforehand
```
 
 npx react-native init "test"
 Pull the repository in some other directory
   - paste android and ios folder from "test" to this directory
 - Make sure you are in the recently pulled repo
 npm install
 npx react-native run-android
```
  <a name="ios1"> </a>
# Running on IOS Option 1

-  **IMPORTANT** : Make sure your environment is ready.
```
 - Pull the repository
 npm install
 - Install cocoapod on your mac
 cd ios
 pod install
 cd ../
 npx react-native run-ios

```
Try option 2 if this one fails

<a name="ios2"> </a>
# Running on IOS Option 2

-  **IMPORTANT** : Make sure your environment is ready. 
- Install React-native cli beforehand
```
 
 npx react-native init "test"
 Pull this repository in some other directory
   - paste android and ios folder from "test" to this directory
 - Make sure you are in the recently pulled repo
 - Install cocoapod on your mac
 cd ios
 pod install
 cd ../
 npx react-native run-ios
```
