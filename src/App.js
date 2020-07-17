import React from 'react';
import Layout from './HOC/Layout/Layout';
import ContactList from './Conteiners/ContactList/ContactList';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import './App.scss';

const App = props => {
  return (
    
    <Router>
        <Layout>
          <Route exact path='/' component={ContactList}/>
          <Route exact path='/login' component={Login}/>
        </Layout>
    </Router>

  );
}

export default App;
