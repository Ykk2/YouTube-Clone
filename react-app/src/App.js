import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './components/home/home';
import NavBar from './components/Navigation/NavBar'
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import VideoDetails from './components/Video/video';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
        <Route path='/videos/:videoId'>
          <VideoDetails />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route>
          <SignUpForm path='/signup' exact={true}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
