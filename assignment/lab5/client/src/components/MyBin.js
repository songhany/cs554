import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import queries from '../queries';


const MyBin = () => {
  const { loading, error, data } = useQuery(queries.GET_BINNED_IMAGES);

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
  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  }
  if(data) { 
    return (
      <div>
        <ul>
          {data.binnedImages.map(e =>{
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
                  <br/>
                  <br/>
                </div>
              )
            }
          })}  
        </ul>
      </div>
    )
  };
}

export default MyBin
