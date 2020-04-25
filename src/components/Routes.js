import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import Login from '../pages/login';
import NotFound from '../components/NotFound';
import PrivateRoute from './PrivateRoute.js';
import CadastrarProduto from '../pages/CadastrarProduto';
import ListarProduto from '../pages/listarProduto';
import VerProduto from '../pages/verProduto';

const Routes = () => (
  <Router >
    <Switch>
      <PrivateRoute path="/cadastrar-produto" component={CadastrarProduto}/>
      <PrivateRoute path="/listar-produto" component={ListarProduto}/>
      <PrivateRoute path="/ver-produto" component={VerProduto} />
      <Route exact path="/" component={Login} />
      <PrivateRoute component={NotFound} />
    </Switch>
  </Router>
)

export default Routes;