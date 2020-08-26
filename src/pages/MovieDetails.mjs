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
            rated: null
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
            fetch(`http://localhost:4000/movielist/${this.props.location.state.title}`)
                .then(res => res.json())
                .then(json => {
                    json = json[0];
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
                                    <h4 class="subsection"><b>Plot Summary</b></h4>
                                    <p>{this.state.plot}</p>
                                    <h4 class="subsection"><b>Director</b></h4>
                                    <p>{this.state.director}</p>
                                    <h4 class="subsection"><b>Castlist</b></h4>
                                    <Table striped bordered>
                                        <tbody>
                                            {this.state.actors.split(',').map(actor => {
                                                return (<tr key={actor}><td>{actor}</td></tr>)
                                            })}
                                        </tbody>
                                    </Table>
                                    <div class="additional-info" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly"}}>
                                        <h4 class="subsection" style={{ flex: "100%" }}>Additional Information</h4>
                                        
                                        <div className="additional-info-item">
                                            <h5 class="subsection"><b>Writer</b></h5>
                                            <p>{this.state.writer}</p>
                                        </div>

                                        <div className="additional-info-item">
                                            <h5 class="subsection"><b>Runtime</b></h5>
                                            <p>{this.state.runtime}</p>
                                        </div>

                                        <div className="additional-info-item">
                                            <h5 class="subsection"><b>Box Office</b></h5>
                                            <p>{this.state.boxOffice}</p>
                                        </div>

                                        <div className="additional-info-item">
                                            <h5 class="subsection"><b>Production</b></h5>
                                            <p>{this.state.production}</p>
                                        </div>

                                        <div className="additional-info-item">
                                            <h5 class="subsection"><b>Release Date</b></h5>
                                            <p>{this.state.released}</p>
                                        </div>

                                        <div className="additional-info-item">
                                            <h5 class="subsection"><b>Rated</b></h5>
                                            <p>{this.state.rated}</p>
                                        </div>
                                    </div>
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