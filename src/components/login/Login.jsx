import React, { useState } from 'react'
import { Col, Container, Form, Button, Row, Card, Toast } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Auth from '../../services/auth/auth'
import { Redirect } from 'react-router-dom'


const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
})

export default props => {
    const [showLoginError, setShowLoginError] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        Auth.logIn(data)
            .then(() => {window.location.replace('/')})
            .catch(err => {
                setShowLoginError(true)
            })
    }

    return (
        <div className="component">
            {!Auth.isAuthenticated() ?
                <Container className="container-fluid mt-5">
                    <Row className="d-flex justify-content-center align-items-center">
                        <Col className="col-4 align-self-center">
                            <Card className="text-center bg-dark">
                                <Card.Header>Log in</Card.Header>
                                <Card.Body>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control {...register("email")} type="email" name="email" placeholder="address@email.com" />
                                            <p className="text-danger"> {errors.email?.message} </p>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control {...register("password")} type="password" name="password" />
                                            <p className="text-danger"> {errors.password?.message} </p>
                                        </Form.Group>
                                        <Button variant="success" type="submit">
                                            Log In
                                        </Button>
                                    </Form>
                                    <Card.Footer className="text-danger">
                                        {showLoginError && "wrong email or password"}
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                :

                <Redirect to={{ pathname: '/#', state: { from: props.location } }} />
            }
        </div>
    )
}