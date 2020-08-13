import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Featured extends React.Component {
    render() {
        return (
            <div id="featured-movie">
                <Card bg={this.props.bg}>
                    <Card.Header>Featured Movie</Card.Header>
                    <Card.Body>
                        <Card.Img id="featured-movie-poster" src={this.props.src} />
                        <p id="featured-movie-title">{this.props.title}</p>
                        <p id="featured-movie-description">{this.props.desc}</p>
                        <Button variant="info" href={"https://www.imdb.com/title/" + this.props.imdb + "/"}>View on IMDb</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export { Featured };