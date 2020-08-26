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
                        <Card.Img className="featured-movie-poster" src={this.state.src} />
                        <p id="featured-movie-title">{this.state.title} ({this.state.year})</p>
                        <p id="featured-movie-description">{this.state.desc}</p>
                        <Button variant="info" href={this.state.imdb} target="_blank">View on IMDb</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Featured;