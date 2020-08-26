import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

class FeaturedMovieEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let newMovie;
        fetch(`http://omdbapi.com/?apikey=cc276c76&i=${this.state.value}`)
            .then(res => res.json())
            .then(json => {
                newMovie = {
                    title: json.Title,
                    year: json.Year,
                    imdb: json.imdbID,
                    plot: json.Plot,
                    poster: json.Poster
                };

                try {
                    fetch("http://localhost:4000/featuredMovie", {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newMovie)
                    }).then(res => res.json())
                        .then((json) => {
                            if (json.success) {
                                alert("Featured movie updated");
                                document.location.reload();
                            } else {
                                alert("Could not update featured movie");
                            }
                        })
                }
                catch {
                    console.log("Error adding movie as new featured movie");
                }
            })
            .catch(err => alert("Could not fetch new movie."));
        this.setState({ value: "" });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <Card bg={this.props.bg} id="featured-movie-edit">
                <Card.Header>Change Featured Movie</Card.Header>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="featuredMovieId">
                            <Form.Control type="text" onChange={this.handleChange} value={this.state.value} placeholder="Enter new IMDb ID..." />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default FeaturedMovieEditor;