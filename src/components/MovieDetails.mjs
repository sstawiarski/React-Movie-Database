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
                        imdb: json.imdb
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
                        imdb: json.imdb
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
                                    <h4 id="details-heading"><b>Plot Summary</b></h4>
                                    <p>{this.state.plot}</p>
                                    <br />

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xs={16} md={4}>
                            <Card bg="light">
                                <Card.Header>Quick Info</Card.Header>
                                <Card.Body>
                                    <Card.Img src={this.state.poster} className="featured-movie-poster" />
                                    <br />
                                    <p><b>Description: </b> {this.state.plot}</p>
                                    <br />
                                    <br />

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