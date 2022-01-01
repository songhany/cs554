import React, {useContext} from 'react';
import SocialSignIn from './SocialSignIn';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import { doSignInWithEmailAndPassword, doPasswordReset } from '../firebase/FirebaseFunctions';


const SignIn = () => {
  const { currentUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    let {email, password} = e.target.elements;

    try {
      await doSignInWithEmailAndPassword(email.value, password.value)
    } catch(error) {
      alert(error);
    }
  }

  const passwordReset = (event) => {
    let email = document.getElementById('email').value;
    if(email) {
      doPasswordReset(email);
      alert('Password email sent');
    } else {
      alert('Please enter an email address below before you click the forgot password link');
    }
  }

  if (currentUser) {  // if current user already login, we redirect it to '/home'
    return <Redirect to='/home' />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>
            Email:
            <input className="form-control" name="email" id="email" type="email" placeholder="Email" required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input className="form-control" name="password" type="password" placeholder="Password" required />
          </label>
        </div>
        <button type="submit">Log in</button>

        <button className="forgotPassword" onClick={passwordReset}>
          Forgot Password
        </button>
      </form>

      <br />
      <SocialSignIn />
    </div>
  );
}

export default SignIn
