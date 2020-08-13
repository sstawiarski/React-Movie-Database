import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: decodeURI(this.props.match.params.title),
            isFound: null,
            title: null,
            year: null,
            poster: null,
            plot: null,
            director: null,
            genre: null,
            actors: null,
            imdb: null,
            isMounted: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setState({ isMounted: true });
        fetch(`http://www.omdbapi.com/?apikey=cc276c76&t=${this.state.searchTerm}`)
            .then(res => res.json())
            .then(json => {
                if (this.state.isMounted) {
                    this.setState({
                        title: json.Title,
                        year: json.Year,
                        plot: json.Plot,
                        poster: json.Poster,
                        director: json.Director,
                        genre: json.Genre,
                        actors: json.Actors.split(", "),
                        isFound: true,
                        searchTerm: "",
                        imdb: json.imdbID
                    });
                }
            })
            .catch(err => console.log(err));
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    handleClick(event) {
        event.preventDefault();
        if (!this.state.title) {
            return;
        }

        try {
            let newMovie = {
                imdb: this.state.imdb,
                title: this.state.title,
                year: this.state.year,
                plot: this.state.plot
            };
            fetch("http://localhost:4000/movielist", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMovie)
            }).then(res => res.json())
                .then((json) => {
                    if (json.success) {
                        alert(this.state.title + " added to the local database.");
                    } else {
                        alert("Could not create new post");
                    }
                })

        } catch {
            alert("Error adding to database");
        }
    }

    render() {
        if (this.state.isFound) {
            return (
                <div id="movie-details">
                    <Row>
                        <Col xs={16} md={8}>
                            <Card bg="light">
                                <Card.Header>Movie Details</Card.Header>
                                <Card.Body>
                                    <h2 style={{ textAlign: "center" }}>{this.state.title} ({this.state.year})</h2>
                                    <h4 id="details-heading"><b>Plot Summary</b></h4>
                                    <p>{this.state.plot}</p>
                                    <br />

                                    <h4 id="details-heading"><b>Directed By</b></h4>
                                    <p>{this.state.director}</p>
                                    <br />

                                    <h4 id="details-heading"><b>Castlist</b></h4>
                                    <Table striped bordered>
                                        <tbody>
                                            {this.state.actors && this.state.actors.map(actor =>
                                                <tr key={actor}>
                                                    <td>{actor}</td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </Table>

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xs={16} md={4}>
                            <Card bg="light">
                                <Card.Header>Quick Info</Card.Header>
                                <Card.Body>
                                    <Card.Img src={this.state.poster} id="featured-movie-poster" />
                                    <br />
                                    <p><b>Directed by: </b> {this.state.director}</p>
                                    <p><b>Description: </b> {this.state.plot}</p>
                                    <p><b>Genre: </b> {this.state.genre}</p>
                                    <br />
                                    <br />
                                    <div id="quick-info-btn-holder">
                                        <Button variant="primary" id="quick-info-btn" onClick={this.handleClick}>Add movie to local database</Button>
                                    </div>

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