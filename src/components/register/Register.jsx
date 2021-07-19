import React, { useState } from 'react'
import { Col, Container, Form, Button, Row, Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Auth from '../../services/auth/auth'


const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    password_confirmation: yup.string().oneOf([yup.ref("password"), null], "passwords must match")
})

export default props => {
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        Auth.register(data)
            .then(() => { window.location.replace('/') })
            .catch(err => {
                if (!!err.response?.data?.error?.errors?.email) {
                    setShowErrorMessage(true)
                    setErrorMessage('Email: ' + err.response.data.error.errors.email[0])
                } else {
                    setShowErrorMessage(true)
                    setErrorMessage('Unable to register: check logs')
                    console.log(err.response)
                }
            })
    }

    return (
        <div className="component">
            <Container className="container-fluid mt-5">
                <Row className="d-flex justify-content-center align-items-center">
                    <Col className="col-4 align-self-center">
                        <Card className="text-center bg-dark">
                            <Card.Header>Register</Card.Header>
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
                                    <Form.Group className="mb-3">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control {...register("password_confirmation")} type="password" name="password_confirmation" />
                                        <p className="text-danger"> {errors.password_confirmation?.message} </p>
                                    </Form.Group>
                                    <Button variant="success" type="submit">
                                        Submit
                                    </Button>
                                    <Card.Footer className="text-danger">
                                        {showErrorMessage && errorMessage}
                                    </Card.Footer>
                                </Form>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}