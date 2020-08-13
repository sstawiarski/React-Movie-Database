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
            description: null,
            imdb: null
        }
    }

    componentDidMount() {
        fetch(`http://www.omdbapi.com/?apikey=cc276c76&i=${this.props.featured}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    title: json.Title,
                    year: json.Year,
                    desc: json.Plot,
                    src: json.Poster,
                    imdb: `https://www.imdb.com/title/${this.props.featured}/`
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
                        <Button variant="info" href={this.state.imdb}>View on IMDb</Button>
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
        this.props.onSubmit(this.state.value);
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