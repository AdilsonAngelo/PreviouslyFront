import React from 'react'
import { Col, Container, Form, Button, Row, Card } from 'react-bootstrap'

export default props => {
    return (
        <div className="component">
            <Container className="container-fluid mt-5">
                <Row className="d-flex justify-content-center align-items-center">
                    <Col className="col-4 align-self-center">
                        <Card className="text-center bg-dark">
                            <Card.Header>Register</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="registerForm.ControlEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control required type="email" placeholder="address@email.com" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="registerForm.ControlPw">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control required type="password" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="registerForm.ControlConfirmPw">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control required type="password" />
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