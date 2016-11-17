import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import ViewerQuery from './ViewerQuery';
import CarsQuery from './CarsQuery';
import AppContainer from '../components/App/AppContainer';

import CarsContainer from '../components/Car/CarsContainer';
import SignupComponent from '../components/Signup/SignupComponent';
import LoginComponent from '../components/Login/LoginComponent';

const queryConfig = function queryConfig(previousParams) {
  const params = previousParams;
  params.limit = 10;
  params.offset = 0;

  return params;
};

export default (
  <Route path='/' component={AppContainer} queries={ViewerQuery}>
    <IndexRoute component={CarsContainer} prepareParams={queryConfig} queries={CarsQuery} />
    <Route path='/signup' component={SignupComponent} />
    <Route path='/login' component={LoginComponent} />
    <Redirect from='*' to='/' />
  </Route>
);


// TODO:
// * Error handling with mutations
// * Connetions
