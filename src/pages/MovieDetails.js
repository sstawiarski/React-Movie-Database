import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { store } from '../authentication/UserProvider';

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

const Consumer = store.Consumer;

class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: this.props.match.params.id,
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
        }

    }

    componentDidMount() {
        this.setState({ isMounted: true });

        if (!this.props.isText) {
            fetch(`http://localhost:4000/moviedetails/${this.state.searchTerm}`)
                .then(res => res.json())
                .then(json => {
                    if (this.state.isMounted) {
                        this.setState({
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
                    }
                })
                .catch(err => console.log(err));

        } else {
            fetch(`http://localhost:4000/movielist/${this.props.match.params.title}`)
                .then(res => res.json())
                .then(json => {
                    if (!json.success) {
                        return;
                    }
                    json = json.foundItems[0];
                    if (this.state.isMounted) {
                        this.setState({
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
                    }
                })
                .catch(err => console.log(err));
        }

    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    addFavorite = async (imdbID, username) => {
        const body = {
            username: username
        }

        try {
            await fetch(`http://localhost:4000/favorites/${imdbID}`, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            this.setState({ successAdd: true });
        }
        catch (error) {
            console.error(error.message)
            this.setState({ successAdd: false });
        }

    }

    removeFavorite = async (imdbID, username) => {
        const body = {
            username: username
        }

        try {
            await fetch(`http://localhost:4000/favorites/${imdbID}`, {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            this.setState({ isFavorited: false, successRemove: true });
        }
        catch (error) {
            console.error(error.message)
            this.setState({ successRemove: false });
        }

    }

    checkFavorite = (imdbID, username) => {
        try {
            fetch(`http://localhost:4000/favorites/${username}/${imdbID}`)
                .then(response => response.json())
                .then(json => {
                    if (json.isInFavorites) {
                        this.setState({ isFavorited: true })
                    }
                });

        }
        catch (error) {
            console.error(error.message)
        }
    }

    render() {
        if (this.state.isFound) {
            return (
                <div id="movie-details">

                    {this.state.successAdd ?
                        <Alert variant="success" onClose={() => this.setState({ successAdd: '' })} dismissible>
                            <AlertText>Movie added to favorites</AlertText>
                        </Alert> : null}
                    {this.state.successAdd === false ?
                        <Alert variant="danger" onClose={() => this.setState({ successAdd: '' })} dismissible>
                            <AlertText>Movie could not be added to favorites</AlertText>
                        </Alert> : null}
                    {this.state.successRemove ?
                        <Alert variant="success" onClose={() => this.setState({ successRemove: '' })} dismissible>
                            <AlertText>Movie removed favorites</AlertText>
                        </Alert> : null}

                    <Row>
                        <Col xs={16} md={8}>
                            <Card bg="light">
                                <Card.Header>Movie Details</Card.Header>
                                <Card.Body>
                                    <h2 style={{ textAlign: "center" }}>{this.state.title} ({this.state.year})</h2>

                                    <Subsection>Plot Summary</Subsection>
                                    <p>{this.state.plot}</p>

                                    <Subsection>Director</Subsection>
                                    <p>{this.state.director}</p>

                                    <Subsection>Castlist</Subsection>
                                    <Table striped bordered>
                                        <tbody>
                                            {this.state.actors.split(',').map(actor => {
                                                return (<tr key={actor}><td>{actor}</td></tr>)
                                            })}
                                        </tbody>
                                    </Table>

                                    <MinorDetails>
                                        <Subsection style={{ flex: "100%" }}>Additional Information</Subsection>

                                        <FlexItem>
                                            <h5 className="subsection"><b>Writer</b></h5>
                                            <p>{this.state.writer}</p>
                                        </FlexItem>

                                        <FlexItem>
                                            <h5 className="subsection"><b>Runtime</b></h5>
                                            <p>{this.state.runtime}</p>
                                        </FlexItem>

                                        <FlexItem>
                                            <h5 className="subsection"><b>Box Office</b></h5>
                                            <p>{this.state.boxOffice}</p>
                                        </FlexItem>

                                        <FlexItem>
                                            <h5 className="subsection"><b>Production</b></h5>
                                            <p>{this.state.production}</p>
                                        </FlexItem>

                                        <FlexItem>
                                            <h5 className="subsection"><b>Release Date</b></h5>
                                            <p>{this.state.released}</p>
                                        </FlexItem>

                                        <FlexItem>
                                            <h5 className="subsection"><b>Rated</b></h5>
                                            <p>{this.state.rated}</p>
                                        </FlexItem>

                                    </MinorDetails>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xs={16} md={4}>
                            <Card bg="light">
                                <Card.Header>Quick Info</Card.Header>
                                <Card.Body>
                                    <Card.Img src={this.state.poster} className="featured-movie-poster" />
                                    <br />
                                    <p><b>Director: </b> {this.state.director}</p>
                                    <p><b>Summary: </b> {this.state.plot}</p>
                                    <p><b>Rated: </b> {this.state.rated}</p>
                                    <p><b>Runtime: </b> {this.state.runtime}</p>
                                    <p><b>IMDb Rating: </b> {this.state.rating}</p>

                                    <Consumer>
                                        {value => {
                                            if (value.state.user) {
                                                this.checkFavorite(this.state.imdb, value.state.user);
                                                if (!this.state.isFavorited) {
                                                    return (<Button onClick={() => this.addFavorite(this.state.imdb, value.state.user)}>Add to favorites</Button>)
                                                } else {
                                                    return (<Button variant="outline-danger" onClick={() => this.removeFavorite(this.state.imdb, value.state.user)}>Remove from favorites</Button>)
                                                }
                                            }
                                            return (null)
                                        }}
                                    </Consumer>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Card bg="light" style={{ marginTop: "20px" }}>
                        <Card.Header>Movie not found</Card.Header>
                        <Card.Body>
                            <h3 style={{ textAlign: "center" }}>Please try again.</h3>
                        </Card.Body>
                    </Card>
                </div>
            );
        }



    }
}

export default MovieDetails;