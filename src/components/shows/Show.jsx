import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default props => {
    return <Row {...props} className="show" key={props.imdbID}>
        <Col className="col-2 align-self-center">
            <img src={props.Poster.replace(/._V1_.*\.jpg/, '._V1_SX75_CR0,0,75,75.jpg')} />
        </Col>
        <Col className="col-8 align-self-center">
            {props.Title}
        </Col>
        <Col className="col-2 align-self-center">
            {props.Year}
        </Col>
    </Row>
}