import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AppliedJobs from '../pages/AppliedJobs';
import AvailableJobs from '../pages/AvailableJobs';
import ForgotPassword from '../pages/ForgotPassword';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import PostedJobs from '../pages/PostedJobs';
import PostJob from '../pages/PostJob';
import Signup from '../pages/Signup';

// ROUTE PATH CONSTANTS
export const ROUTE_LOGIN = '/login'
export const ROUTE_SIGN_UP = '/sign-up'
export const ROUTE_FORGOT_PASSOWORD = '/forgot-password'
export const ROUTE_AVAILABLE_JOBS = '/available-jobs'
export const ROUTE_APPLIED_JOBS = '/applied-jobs'
export const ROUTE_POSTED_JOBS = '/posted-jobs'
export const ROUTE_POST_JOB = '/post-job'

// ROUTES 
export const ROUTES = [
  // TODO: Here if user is authenicated redirect him to /dashboard page 
  { path: "/", key: "ROOT", exact: true, component: LandingPage },
  { path: ROUTE_LOGIN, key: "LOGIN", exact: true, component: Login },
  { path: ROUTE_FORGOT_PASSOWORD, key: "LOGIN", exact: true, component: ForgotPassword },
  { path: ROUTE_SIGN_UP, key: "SIGNUP", exact: true, component: Signup },
  { path: ROUTE_AVAILABLE_JOBS, key: "SIGNUP", exact: true, component: AvailableJobs },
  { path: ROUTE_APPLIED_JOBS, key: "SIGNUP", exact: true, component: AppliedJobs },
  { path: ROUTE_POSTED_JOBS, key: "SIGNUP", exact: true, component: PostedJobs },
  { path: ROUTE_POST_JOB, key: "POSTJOB", exact: true, component: PostJob },
]

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  );
}

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}


