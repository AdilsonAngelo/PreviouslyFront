import React from 'react'
import { Col, Container, Form, Button, Row, Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirm_password: yup.string().oneOf([yup.ref("password"), null], "passwords must match")
})

export default props => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => console.log(data)

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
                                        <Form.Control {...register("confirm_password")} type="password" name="confirm_password" />
                                        <p className="text-danger"> {errors.confirm_password?.message} </p>
                                    </Form.Group>
                                    <Button variant="success" type="submit">
                                        Submit
                                    </Button>
                                </Form>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}