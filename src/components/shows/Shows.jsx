import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import previously from '../../services/previously/previously'
import Show from './Show'

export default props => {

    const [shows, setShows] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [lastSeen, setLastSeen] = useState({})

    useEffect(() => {
        previously.listShows()
            .then(res => {
                setShows(res.data)
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            })
            .catch(err => {
                console.log(err.response)
                setLoading(false)
            })


        previously.lastSeen()
            .then(res => {

                res.data.forEach(ls => {
                    lastSeen[ls.tvshow_imdb_id] = ls
                })
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            })
            .catch(err => {
                console.log(err.response)
                setLoading(false)
            })
    }, [])


    if (isLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center mt-5 bg-dark">
                <Spinner size="lg" animation="border" role="status" variant="light">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        )
    }

    return (
        <div className="component">
            <Container className="container-fluid mt-5 bg-dark pt-5 pb-5">
                <Row className="mb-1">
                    <Col className="text-center">
                        <h2>My shows</h2>
                        <hr></hr>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-5 align-self-center text-center">
                        Last seen episodes
                    </Col>
                    <Col className="col-2 align-self-center text-end">
                        Season
                    </Col>
                    <Col className="col-2 align-self-center text-end">
                        Episode
                    </Col>

                </Row>
                <hr></hr>
                {
                    shows.map(show => {
                        return <Show lastseen={lastSeen[show.imdb_id]} actions={true} {...show} />
                    })
                }
            </Container>
        </div>
    )
}