import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

class Featured extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: null,
            title: null,
            desc: null,
            imdb: null,
            year: null
        }
    }

    componentDidMount() {
        fetch(`http://localhost:4000/featuredMovie`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    title: json.title,
                    year: json.year,
                    desc: json.plot,
                    src: json.poster,
                    imdb: `https://www.imdb.com/title/${json.imdb}/`,
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div id="featured-movie">
                <Card bg={this.props.bg}>
                    <Card.Header>Featured Movie</Card.Header>
                    <Card.Body>
                        <Card.Img id="featured-movie-poster" src={this.state.src} />
                        <p id="featured-movie-title">{this.state.title} ({this.state.year})</p>
                        <p id="featured-movie-description">{this.state.desc}</p>
                        <Button variant="info" href={this.state.imdb} target="_blank">View on IMDb</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

class FeaturedEditor extends React.Component {
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
        event.preventDefault();
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <Card bg={this.props.bg}>
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

export { Featured, FeaturedEditor };