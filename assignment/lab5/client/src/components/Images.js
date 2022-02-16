import React, { useState } from 'react';
import '../App.css';
import { useMutation, useQuery } from '@apollo/client';
import queries from '../queries';

const Images = () => {
  const [pg, setPg] = useState(1);
  const { loading, error, data } = useQuery(queries.GET_UNSPLASH_IMAGES,{ variables: { pageNum: pg }});

  const [updateImage] = useMutation(queries.UPDATE_IMAGE);
  
  const toggleButton = (e) => {
    if (e.binned===false) {
      {updateImage({variables:{
          "id": e.id,
          "url": e.url,
          "posterName": e.posterName,
          "description": e.description,
          "userPosted": e.userPosted,
          "binned": true
        }})}
        alert("Binned Img");
      } else if (e.binned === true) {
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

  const increPageNum = async () => {
    setPg(pg + 1);
  };

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
        <ul>
          {data.unsplashImages.map(e =>{
            if (e.binned===false) {
              return(
                <div key={e.id}>
                  <li>
                    <p>{e.description}</p>
                    <img src = {e.url} alt ="img"/>
                    <p>poster: {e.posterName}</p>
                    <div>    
                      <button className = "binnedButton" onClick={() => {toggleButton(e)}}>Add to bin</button>  
                    </div>
                  </li>
                  <br/>
                  <br/>
                </div>
              )
            } else if (e.binned===true)  {
              return(
                <div key={e.id}>
                  <li>
                    <p>{e.description}</p>
                    <img src = {e.url} alt="img"/>
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
        <button className = "button" onClick = {increPageNum}>Get More</button>
      </div>
    )
  }
}

export default Images
