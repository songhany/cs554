import { gql } from '@apollo/client';

const GET_UNSPLASH_IMAGES = gql`
  query UnsplashImages($pageNum: Int) {
    unsplashImages(pageNum: $pageNum) {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

const GET_BINNED_IMAGES = gql`
  query BinnedImages {
    binnedImages {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

const GET_USER_POSTED_IMAGES = gql`
  query UserPostedImages {
    userPostedImages {
      id
      url
      posterName
      description
      userPosted
      binned
    }
}`

const UPLOAD_IMAGE = gql`
  mutation UploadImage($url: String!, $description: String, $posterName: String) {
    uploadImage(url: $url, description: $description, posterName: $posterName) {
      url
      posterName
      description
    }
  }
`;

const UPDATE_IMAGE = gql`
  mutation UpdateImage($id: ID!, $url: String, $posterName: String, $description: String, $userPosted: Boolean, $binned: Boolean){
    updateImage(id: $id, url: $url, posterName: $posterName, description: $description, userPosted:$userPosted, binned: $binned){
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`

const DELETE_IMAGE = gql`
  mutation DeleteImage($deleteImageId: ID!) {
    deleteImage(id: $deleteImageId) {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

let exported = {
  GET_UNSPLASH_IMAGES,
  GET_BINNED_IMAGES,
  GET_USER_POSTED_IMAGES,
  UPLOAD_IMAGE,
  UPDATE_IMAGE,
  DELETE_IMAGE
};

export default exported;