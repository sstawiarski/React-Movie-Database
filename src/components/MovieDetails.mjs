import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table'


class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            searchTerm: this.props.input,
            isFound: null,
            title: null,
            year: null,
            poster: null,
            plot: null,
            director: null,
            genre: null,
            actors: null
        }
    
    }

    componentDidMount() {

        fetch(`http://www.omdbapi.com/?apikey=cc276c76&t=${this.state.searchTerm}`)
        .then(res => res.json())
        .then(json => {
            this.setState({
                title: json.Title,
                year: json.Year,
                plot: json.Plot,
                poster: json.Poster,
                director: json.Director,
                genre: json.Genre,
                actors: json.Actors.split(", "),
                isFound: true
            });
        })
        .catch(err => console.log(err));
    }

    render() {

        if (!this.state.isFound) {
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
        else {
            return (
                <div id="movie-details">
                    <Row>
                        <Col>
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

                        <Col xs={4}>
                            <Card bg="light">
                                <Card.Header>Quick Info</Card.Header>
                                <Card.Body>
                                    <Card.Img src={this.state.poster} id="featured-movie-poster" />
                                    <br />
                                    <p><b>Directed by: </b> {this.state.director}</p>
                                    <p><b>Description: </b> {this.state.plot}</p>
                                    <p><b>Genre: </b> {this.state.genre}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        }

    }
}

export default MovieDetails;