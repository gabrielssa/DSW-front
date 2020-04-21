import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import Login from '../pages/login';
import Register from '../pages/register';
import Home from '../pages/home';
import NotFound from '../components/NotFound';
import PrivateRoute from './PrivateRoute.js';
import CadastrarProduto from '../pages/CadastrarProduto';
import ListarProduto from '../pages/listarProduto';

const Routes = () => (
  <Router >
    <Switch>
      <Route path="/register" component={Register} />
      <PrivateRoute path="/cadastrar-produto" component={CadastrarProduto}/>
      <PrivateRoute path="/listar-produto" component={ListarProduto}/>
      <Route exact path="/" component={Login} />
      <PrivateRoute component={NotFound} />
    </Switch>
  </Router>
)

export default Routes;