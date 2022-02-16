import React from 'react'
import { useMutation } from '@apollo/client';
import queries from '../queries';

const NewPost = () => {
  const[upload] = useMutation(queries.UPLOAD_IMAGE);
  let description = '';
  let url = '';
  let poster = '';

  return (
    <div>
      <h1>Create a Post</h1>
      <form className='form' 
          onSubmit={(e) => {
          e.preventDefault();
          upload({
            variables: {
              url: url.value,
              description: description.value,
              posterName: poster.value
            }
          });
          // intialize form value
          description = '';
          url = '';
          poster = '';
          alert("Create a post successfully");
        }}>
      
      <div className='form-group'>
        <label>
          Description:
          <br />
          <input ref={(node)=>{description = node}} required autoFocus={true}/>
        </label>
      </div>
      <br />

      <div className='form-group'>
        <label>
          Image URL:
          <br />
          <input ref={(node)=>{url = node}} required autoFocus={true}/>
        </label>
      </div>
      <br />

      <div className='form-group'>
        <label>
          Author Name:
          <br />
          <input ref={(node)=>{poster = node}} required autoFocus={true}/>
        </label>
      </div>
      <br />

      <button className='button' type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default NewPost
