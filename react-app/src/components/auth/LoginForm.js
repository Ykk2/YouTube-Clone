import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './loginform.css'

const LoginForm = () => {

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const signUp = () => {(
    history.push('/signup')
  )}


  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoSignIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("user1@aa.io", "password"))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className="login-form" onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="login-form-top">
        <div>Google</div>
        <div>Sign in</div>
        <div>to continue to uTube</div>
      </div>
      <div className="email-field-login">
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className="password-field-login">
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            value={password}
            onChange={updatePassword}
          />
      </div>
      <div>
        Don't have an account? Log in as a <a onClick={demoSignIn}>Demo User</a>
      </div>
      <div>
        <span onClick={signUp}>Create Account</span>
        <button type='submit'>Sign in</button>
      </div>
    </form>
  );
};

export default LoginForm;
