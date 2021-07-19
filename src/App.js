import React from 'react'

import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import qs from 'querystring'

import { Container, Navbar, Row, Col, Form, Button } from 'react-bootstrap'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Shows from './components/shows/Shows'
import Auth from './services/auth/auth'
import SearchResult from './components/SearchResult'
import Episodes from './components/shows/Episodes'


const schema = yup.object().shape({
  query: yup.string().min(4).required()
})

export default function App(props) {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const submitSearch = (data) => {
    window.location.replace('/search?' + qs.stringify({query: data.query}))
  }

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

              <>
                <Form className="d-flex" onSubmit={handleSubmit(submitSearch)}>
                  <Form.Control
                    type="search"
                    placeholder="(4 characters minimum)"
                    className="mr-2"
                    name="query"
                    {...register("query")}
                  />
                  <Button variant="success" type="submit">Search</Button>
                </Form>
                <Row>
                  <Col>
                    <span className='text-light'>{localStorage.getItem("previouslyUserEmail")}</span>
                  </Col>
                  <Col>
                    <Link to="javascript.void(0)" onClick={() => Auth.logOut()} className="btn btn-outline-danger bg-light btn-sm">
                      Log Out
                    </Link>
                  </Col>
                </Row>
              </>
            }
          </Container>
        </Navbar>
        <Switch>
          <ProtectedRoute path="/" exact component={Shows} />
          <ProtectedRoute path="/search" component={SearchResult} />
          <ProtectedRoute path="/shows/:imdbID" component={Episodes} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  )
}
