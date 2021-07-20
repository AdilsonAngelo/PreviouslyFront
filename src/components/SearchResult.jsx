import React, { useEffect, useState } from 'react'
import qs from 'querystring'
import { Col, Container, Pagination, Row, Spinner } from 'react-bootstrap'
import previously from '../services/previously/previously'
import './SearchResult.css'
import Show from './shows/Show'

export default props => {

    const [query, setQuery] = useState(null)
    const [shows, setShows] = useState([])
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        let params = qs.parse(props.location.search.replace('?', ''))
        let pageNum = 1
        if (!!params.page && Number(params.page) > 0) {
            pageNum = params.page
        }

        if (params.query?.length < 4) { setShows([]); return }

        setQuery(params.query)

        previously.search(params.query, pageNum)
            .then(res => {
                setPage(res.data.page)
                setPages(Math.ceil(res.data.total / 10))
                setShows(res.data.results)
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

    const loadPages = () => {
        var items = [...Array(pages).keys()].map(i => i + 1);
        let start = (page - 3 < 0) ? 0 : page - 3
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
                    let path = "/search?query=" + query + "&page=" + item
                    if (item === page) path = '#'
                    return (
                        <Pagination.Item href={path} className={item === page ? "active text-light" : ""} key={"page-" + item}>
                            {item}
                        </Pagination.Item>
                    )
                })
            }
            {
                !items.includes(pages) ?
                    <>
                        <Pagination.Item>{">"}</Pagination.Item>
                        <Pagination.Item>{">>"}</Pagination.Item>
                    </> : <></>
            }
        </>
    }

    return (
        <div className="component">
            <Container className="container-fluid mt-5 pt-1 bg-dark">
                {
                    shows.map(show => {
                        return <Show {...show} onClick={() => window.location.replace('/shows/' + show.imdb_id)} />
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
        </div>
    )
}