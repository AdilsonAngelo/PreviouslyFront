import React, { useState } from 'react'
import { Col, Row, Modal, Button } from 'react-bootstrap'
import previously from '../../services/previously/previously';

export default props => {

    const [show, setShow] = useState(false);

    const handleDelete = () => {
        console.log(props.imdb_id)
        previously.unmarkAllEpisodes(props.imdb_id)
            .then(res => {
                window.location.reload()
            })
            .catch(err =>
                console.log(err.response))
    }

    const gotoShowPage = () => {
        window.location.replace('/shows/' + props.imdb_id)
    }

    return <Row {...props} className="show pt-1 pb-1" key={props.imdb_id}>
        <Col onClick={gotoShowPage} className="col-1 align-self-center text-center">
            <img src={props.poster?.replace(/._V1_.*\.jpg/, '._V1_SX75_CR0,0,75,75.jpg')} />
        </Col>
        <Col onClick={gotoShowPage} className="col-4 align-self-center text-end">
            {props.title}
        </Col>
        {
            props.actions ?
                <>
                    <Col className="col-2 align-self-center text-end">
                        {props.lastseen.season}
                    </Col>
                    <Col className="col-2 align-self-center text-end">
                        {props.lastseen.number}
                    </Col>
                    <Col className="col-2 align-self-center text-end">
                        <Button className="btn-light" onClick={() => setShow(true)}>
                            <i className="bi bi-trash-fill text-danger"></i>
                        </Button>
                    </Col>
                    <Modal show={show} fullscreen="md-down" onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete show</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure that you want to delete this show from your list?</Modal.Body>
                        <Modal.Footer>
                            <Button className="btn-danger" onClick={() => handleDelete()}>Yes, delete it!</Button>
                        </Modal.Footer>
                    </Modal>
                </>

                :

                <Col className="col-2 align-self-center text-end">
                    {props.year}
                </Col>
        }
    </Row>
}