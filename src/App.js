import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import { Container, Navbar, Button, Form } from 'react-bootstrap'

import Login from './components/login/Login'
import Register from './components/register/Register'
import Shows from './components/shows/Shows'


export default function App(props) {
  return (
    <Router>
      <div className="App">
        <Navbar className="navbar navbar-dark bg-dark shadow-sm">
          <Container>
            <Link to="/" className="navbar-brand">
              Previously
            </Link>

            <Form className="d-flex">
              <Link to="/login" className="btn btn-outline-secondary bg-light">Log In</Link>
              <Link to="/register"  className="btn btn-outline-primary bg-light">Register</Link>
            </Form>
          </Container>
        </Navbar>
        <Switch>
          <Route path="/" exact component={Shows} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  )
}