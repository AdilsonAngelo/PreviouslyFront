import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default props => {

    const pimba = () => [1, 2, 3]
    return (
        <div className="component">
            <Container className="container-fluid mt-5 bg-dark text-light">
                <Row className="">

                </Row>
                <Row className="d-flex justify-content-center align-items-center">
                    {/* {
                        pimba().map((el, idx) => {
                            return  (<Col className="align-self-center">
                                {el} {idx}
                            </Col>)
                        })
                    } */}
                </Row>
            </Container>
        </div>
    )
}