import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import { AuthContext } from '../firebase/Auth';
import SocialSignIn from './SocialSignIn';

const SignUp = () => {
  const { currentUser } = useContext(AuthContext);
  const [ pwMatch, setPwMatch ] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();  // prevent form default behavior
    const { displayName, email, passwordOne, passwordTwo } = e.target.elements;
    if (passwordOne.value !== passwordTwo.value) {
      setPwMatch('Passwords do not match');
      return false;
    }

    try {
      await doCreateUserWithEmailAndPassword(email.value, passwordOne.value, displayName)
    } catch(error) {
      alert(error);
    }
  }

  if (currentUser) {
    return <Redirect to='/home' />;
  }

  return (
    <div>
      <h1>Sign up</h1>
      {pwMatch && <h4 className="error">{pwMatch}</h4>}  {/* If signup password don't match will render this */}
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>
            Name:
            <input className="form-control" name="displayName" type="text" placeholder="Name" required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input className="form-control" name="email" type="email" placeholder="Email" required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input className="form-control" id="passwordOne" name="passwordOne" type="password" placeholder="Password" required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Confirm Password:
            <input className="form-control" name="passwordTwo" type="password" placeholder="Confirm Password" required />
          </label>
        </div>
        <button id="submitButton" name="submitButton" type="submit">
          Sign Up
        </button>
      </form>
      <br />
      <SocialSignIn />
    </div>
  );
}

export default SignUp
