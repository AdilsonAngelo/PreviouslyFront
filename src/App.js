import React from 'react'

import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import { Container, Navbar, Row, Col } from 'react-bootstrap'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Shows from './components/shows/Shows'
import Auth from './services/auth/auth'


export default function App(props) {
  return (
    <Router>
      <div className="background"></div>
      <div>
        <Navbar className="navbar navbar-dark bg-dark shadow-sm">
          <Container>
            <Link to="/" className="navbar-brand">
              Previously
            </Link>

            {!Auth.isAuthenticated() ?
              <Row>
                <Col>
                  <Link to="/login" className="btn btn-outline-secondary bg-light btn-sm">
                    Log In
                  </Link>
                </Col>

                <Col>
                  <Link to="/register" className="btn btn-outline-primary bg-light btn-sm">
                    Register
                  </Link>
                </Col>
              </Row>

              :
              <Row>
                <Col>
                <span className='text-light'>{localStorage.getItem("previouslyUserEmail")}</span>
                </Col>
                <Col>
                  <Link href="javascript.void(0)" onClick={() => Auth.logOut()} className="btn btn-outline-danger bg-light btn-sm">
                    Log Out
                  </Link>
                </Col>
              </Row>
            }
          </Container>
        </Navbar>
        <Switch>
          <ProtectedRoute path="/" exact component={Shows} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  )
}
