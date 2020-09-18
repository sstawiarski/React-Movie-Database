import React, {useEffect, useState, useContext} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import {store} from '../authentication/UserProvider';

import styled from 'styled-components';

const AlertText = styled.p`
    text-align: center;
    margin-top: 5px;
`;

const Subsection = styled.h4`
    margin-top: 20px;
    font-weight: bold;
`;

const MinorDetails = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

const FlexItem = styled.div`
    flex-basis: 33%;
`;

const MovieDetails = (props) => {
    const [{
        searchTerm,
        isFound,
        title,
        year,
        poster,
        plot,
        imdb,
        director,
        runtime,
        rating,
        actors,
        writer,
        boxOffice,
        production,
        released,
        rated,
        successAdd,
        isFavorited,
        successRemove
    }, setState] = useState({
        searchTerm: null,
        isFound: null,
        title: null,
        year: null,
        poster: null,
        plot: null,
        imdb: null,
        director: null,
        runtime: null,
        rating: null,
        actors: null,
        writer: null,
        boxOffice: null,
        production: null,
        released: null,
        rated: null,
        successAdd: '',
        isFavorited: false,
        successRemove: ''
    });

    const userState = useContext(store)

    useEffect(() => {
        if (props.match.params.title) {
            setState(prevState => ({
                ...prevState,
                searchTerm: props.match.params.title
            }))
        } else if (props.match.params.id) {
            setState(prevState => ({
                ...prevState,
                searchTerm: props.match.params.id
            }))
        }
    }, [props.match.params.title, props.match.params.id]);

    useEffect(() => {
        if (searchTerm) {
            if (!props.isText) {
                fetch(`http://localhost:4000/moviedetails/${searchTerm}`)
                    .then(res => res.json())
                    .then(json => {
                        setState({
                            title: json.title,
                            year: json.year,
                            plot: json.plot,
                            poster: json.poster,
                            isFound: true,
                            searchTerm: "",
                            imdb: json.imdb,
                            director: json.director,
                            runtime: json.runtime,
                            rating: json.rating,
                            actors: json.actors,
                            writer: json.writer,
                            boxOffice: json.boxOffice,
                            production: json.production,
                            released: json.released,
                            rated: json.rated
                        });
                    })
                    .catch(err => console.log(err));

            } else {
                fetch(`http://localhost:4000/movielist/${searchTerm}`)
                    .then(res => res.json())
                    .then(json => {
                        if (!json.success) {
                            return;
                        }
                        json = json.foundItems[0];
                        setState({
                            title: json.title,
                            year: json.year,
                            plot: json.plot,
                            poster: json.poster,
                            isFound: true,
                            searchTerm: "",
                            imdb: json.imdb,
                            director: json.director,
                            runtime: json.runtime,
                            rating: json.rating,
                            actors: json.actors,
                            writer: json.writer,
                            boxOffice: json.boxOffice,
                            production: json.production,
                            released: json.released,
                            rated: json.rated
                        });
                    })
                    .catch(err => console.log(err));
            }
        }
    }, [searchTerm, props.isText])

    useEffect(() => {
        const checkFavorite = async (imdbID, username) => {
            try {
                const response = await fetch(`http://localhost:4000/favorites/${username}/${imdbID}`);
                const json = await response.json();
                if (json) {
                    if (json.isInFavorites) {
                        setState(prevState => ({
                            ...prevState,
                            isFavorited: true
                        }))
                    }
                }
            } catch (error) {
                console.error(error.message)
            }
        };

        checkFavorite(imdb, userState.state.user);
    }, [imdb, userState.state.user, successAdd])

    const addFavorite = async () => {
        const body = {
            username: userState.state.user
        }

        try {
            await fetch(`http://localhost:4000/favorites/${imdb}`, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            setState(prevState => ({
                ...prevState,
                successAdd: true
            }));
        } catch (error) {
            console.error(error.message)
            setState(prevState => ({
                ...prevState,
                successAdd: false
            }));
        }

    }

    const removeFavorite = async () => {
        const body = {
            username: userState.state.user
        }

        try {
            await fetch(`http://localhost:4000/favorites/${imdb}`, {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            setState(prevState => ({
                ...prevState,
                isFavorited: false,
                successRemove: true
            }))
        } catch (error) {
            console.error(error.message)
            setState(prevState => ({
                ...prevState,
                successRemove: false
            }))
        }

    }

    if (isFound) {
        return (
            <div id="movie-details">

                {successAdd ?
                    <Alert variant="success" onClose={() => setState(prevState => ({
                        ...prevState,
                        successAdd: ''
                    }))} dismissible>
                        <AlertText>Movie added to favorites</AlertText>
                    </Alert> : null}
                {successAdd === false ?
                    <Alert variant="danger" onClose={() => setState(prevState => ({
                        ...prevState,
                        successAdd: ''
                    }))} dismissible>
                        <AlertText>Movie could not be added to favorites</AlertText>
                    </Alert> : null}
                {successRemove ?
                    <Alert variant="success" onClose={() => setState(prevState => ({
                        ...prevState,
                        successRemove: ''
                    }))} dismissible>
                        <AlertText>Movie removed favorites</AlertText>
                    </Alert> : null}

                <Row>
                    <Col xs={16} md={8}>
                        <Card bg="light">
                            <Card.Header>Movie Details</Card.Header>
                            <Card.Body>
                                <h2 style={{textAlign: "center"}}>{title} ({year})</h2>

                                <Subsection>Plot Summary</Subsection>
                                <p>{plot}</p>

                                <Subsection>Director</Subsection>
                                <p>{director}</p>

                                <Subsection>Castlist</Subsection>
                                <Table striped bordered>
                                    <tbody>
                                    {actors.split(',').map(actor => {
                                        return (<tr key={actor}>
                                            <td>{actor}</td>
                                        </tr>)
                                    })}
                                    </tbody>
                                </Table>

                                <MinorDetails>
                                    <Subsection style={{flex: "100%"}}>Additional Information</Subsection>

                                    <FlexItem>
                                        <h5 className="subsection"><b>Writer</b></h5>
                                        <p>{writer}</p>
                                    </FlexItem>

                                    <FlexItem>
                                        <h5 className="subsection"><b>Runtime</b></h5>
                                        <p>{runtime}</p>
                                    </FlexItem>

                                    <FlexItem>
                                        <h5 className="subsection"><b>Box Office</b></h5>
                                        <p>{boxOffice}</p>
                                    </FlexItem>

                                    <FlexItem>
                                        <h5 className="subsection"><b>Production</b></h5>
                                        <p>{production}</p>
                                    </FlexItem>

                                    <FlexItem>
                                        <h5 className="subsection"><b>Release Date</b></h5>
                                        <p>{released}</p>
                                    </FlexItem>

                                    <FlexItem>
                                        <h5 className="subsection"><b>Rated</b></h5>
                                        <p>{rated}</p>
                                    </FlexItem>

                                </MinorDetails>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={16} md={4}>
                        <Card bg="light">
                            <Card.Header>Quick Info</Card.Header>
                            <Card.Body>
                                <Card.Img src={poster} className="featured-movie-poster"/>
                                <br/>
                                <p><b>Director: </b> {director}</p>
                                <p><b>Summary: </b> {plot}</p>
                                <p><b>Rated: </b> {rated}</p>
                                <p><b>Runtime: </b> {runtime}</p>
                                <p><b>IMDb Rating: </b> {rating}</p>

                                {isFavorited ? <Button variant="outline-danger"
                                                       onClick={removeFavorite}>Remove
                                    from favorites</Button> : <Button
                                    onClick={addFavorite}>Add
                                    to favorites</Button>}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    } else {
        return (
            <div>
                <Card bg="light" style={{marginTop: "20px"}}>
                    <Card.Header>Movie not found</Card.Header>
                    <Card.Body>
                        <h3 style={{textAlign: "center"}}>Please try again.</h3>
                    </Card.Body>
                </Card>
            </div>
        );
    }


}

export default MovieDetails;