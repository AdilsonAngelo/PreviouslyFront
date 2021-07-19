import React, { useEffect, useState } from 'react'
import { Col, Container, Pagination, Row, Spinner } from 'react-bootstrap'
import qs from 'querystring'
import Episode from './Episode'
import previously from '../../services/previously/previously'

export default props => {


    const [showCode, setShowCode] = useState('')
    const [show, setShow] = useState(null)
    const [episodes, setEpisodes] = useState([])
    const [season, setSeason] = useState(1)
    const [seasons, setSeasons] = useState(1)
    const [isLoading, setLoading] = useState(true)
    const [errorSelectingEpisode, setSelectEpisodeError] = useState(false)
    const [marked, setMarked] = useState(new Set)

    useEffect(() => {
        let params = qs.parse(props.location.search.replace('?', ''))
        let showImdbId = props.match.params?.imdbID
        let seasonNum = 1
        if (!!params.season && Number(params.season) > 0) {
            seasonNum = params.season
        }
        previously.listEpisodes(showImdbId, seasonNum)
            .then(res => {
                setEpisodes(res.data.episodes)
                setSeason(Number(res.data.season))
                setSeasons(Number(res.data.total_seasons))
                setShow(res.data.title)
                setShowCode(showImdbId)
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            })
            .catch(err => {
                console.log(err.response)
                setLoading(false)
            })

        previously.listMarkedEpisodes(showImdbId)
        .then(res => {
            res.data.forEach((ep) => {
                setMarked(marked.add(ep.imdb_id))
            })
        })
        .catch(err => {
            console.log(err.response)
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


    const loadPages = () => {

        var items = [...Array(seasons).keys()].map(i => i + 1);
        let start = (season - 3 < 0) ? 0 : season - 3
        start = season === seasons ? start - 1 : start
        items = items.slice(start, start + 5)

        return <>
            {
                !items.includes(1) ?
                    <>
                        <Pagination.Item>{"<<"}</Pagination.Item>
                        <Pagination.Item>{"<"}</Pagination.Item>
                    </> : <></>
            }
            {
                items.map((item) => {
                    let path = "/shows/" + showCode + "?season=" + item
                    if (item === season) path = '#'
                    return (
                        <Pagination.Item href={path} className={item === season ? "active text-light" : ""} key={"season-" + item}>
                            {item}
                        </Pagination.Item>
                    )
                })
            }
            {
                !items.includes(seasons) ?
                    <>
                        <Pagination.Item>{">"}</Pagination.Item>
                        <Pagination.Item>{">>"}</Pagination.Item>
                    </> : <></>
            }
        </>
    }

    const markEpisode = (epCode) => {
        setLoading(true)
        previously.markEpisode(epCode)
            .then(res => {
                setLoading(true)
                setMarked(marked.add(epCode))
                setSelectEpisodeError(false)
                setLoading(false)
            })
            .catch(err => {
                setSelectEpisodeError(true)
            })
    }

    return (
        <div className="component">
            <Container className="container-fluid mt-5 bg-dark">
                <Row className="mb-5">
                    <h2>{show}</h2>
                    <h4>Season {season}</h4>
                    <hr></hr>
                    <span className="text-danger">{errorSelectingEpisode && "Unable to select episode"}</span>
                </Row>
                {
                    episodes.map(episode => {
                        let mark = marked.has(episode.imdbID)
                        return (
                            <>
                                <Episode
                                    {...episode}
                                    marked={mark}
                                    id={episode.imdbID}
                                    onClick={() => markEpisode(episode.imdbID)} />
                            </>
                        )
                    })
                }
                <Row className="mt-5">
                    <Col className="col-12 align-self-center">
                        <Pagination className="justify-content-center">
                            {loadPages()}
                        </Pagination>
                    </Col>
                </Row>
            </Container>

            {/* <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>Modal body content</Modal.Body>
            </Modal> */}
        </div>
    )
}