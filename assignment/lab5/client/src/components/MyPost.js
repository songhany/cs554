import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import queries from '../queries';
import { Link } from "react-router-dom";


const MyPost = () => {
  const { loading, error, data } = useQuery(queries.GET_USER_POSTED_IMAGES);
  const [rmImg] = useMutation(queries.DELETE_IMAGE);

  const [updateImage] = useMutation(queries.UPDATE_IMAGE);
  const toggleButton = (e) => {
    if (e.binned==false) {
      {updateImage({variables:{
          "id": e.id,
          "url": e.url,
          "posterName": e.posterName,
          "description": e.description,
          "userPosted": e.userPosted,
          "binned": true
        }})}
        alert("Binned Img");
      } else if (e.binned == true) {
      {updateImage({variables:{
        "id": e.id,
        "url": e.url,
        "posterName": e.posterName,
        "description": e.description,
        "userPosted": e.userPosted,
        "binned": false
      }})}
      alert("Unbinned Img")
    }
  }

  function ErrorComponent() {
    return (
      <div>
        <h1>404 - Not Found! </h1>
      </div>
    )
  }

  if (error) {
    return (
      <ErrorComponent></ErrorComponent>
    )
  }
  if (loading){
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  }
  if(data) { 
    return (
      <div>
        <Link className='navlink' to='/new-post'>Upload a Post</Link>
        <ul>
          {data.userPostedImages.map(e => {
            console.log(e);
            if (e.binned==false) {
              return(
                <div key={e.id}>
                  <li>
                    <p>{e.description}</p>
                    <img src={e.url} alt="img"/>
                    <p>poster: {e.posterName}</p>
                    <div>    
                      <button className = "binnedButton" onClick={() => {toggleButton(e)}}>Add to bin</button>  
                    </div>
                  </li>
                  <button className = "deleteButton" 
                    onClick = {()=>{
                      try{
                        rmImg({variables:{deleteImageId: e.id}})
                        alert("Deleted Success")
                      } catch(e){
                        console.log(e)
                        alert("Fail Delete")
                      }}}> Delete </button>
                  <br/>
                  <br/>
                </div>
              )
            } else if (e.binned==true)  {
              return(
                <div key={e.id}>
                  <li>
                    <p>{e.description}</p>
                    <img src={e.url} alt="img"/>
                    <p>poster: {e.posterName}</p>
                    <div>    
                      <button className = "binnedButton" onClick={() => {toggleButton(e)}}>Remove from bin</button>  
                    </div>
                  </li>
                  <button className = "deleteButton" 
                    onClick = {()=>{
                      try{
                        rmImg({variables:{deleteImageId: e.id}})  // deleteImageId have to match the query formal parameter name
                        alert("Deleted Success")
                      } catch(e){
                        console.log(e)
                        alert("Fail Delete Image")
                      }}}> Delete </button>
                  <br/>
                  <br/>
                </div>
              )
            }
          })}  
        </ul>
      </div>
    )
  }
}

export default MyPost
