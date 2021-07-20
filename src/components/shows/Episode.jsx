import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default props => {
    return (
        <Row
        {...props}
        className={
            props.marked ?
            "show pb-1 pt-1 bg-success"
            :
            "show pb-1 pt-1"
        }
        key={props.imdb_id}>
            <Col className="col-2 align-self-center">
                {props.Episode}
            </Col>
            <Col className="col-8 align-self-center">
                {props.Title}
            </Col>
            <Col className="col-2 align-self-center">
                {props.Released}
            </Col>
        </Row>
    )
}