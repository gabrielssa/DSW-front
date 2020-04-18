import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';

const Routes = [
    {
      path: "/login",
      component: Login
    },
    {
      path: "/register",
      component: Register
    },
    {
        path: "/",
        component: Home
    }
  ];

export default Routes