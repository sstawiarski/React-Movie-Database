import React from 'react';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Featured = (props) => {
    const [{
        src,
        title,
        desc,
        imdb,
        year
    }, setState] = React.useState({
        src: null,
        title: null,
        desc: null,
        imdb: null,
        year: null
    })

    const getFeatured = async () => {
        const resp = await fetch(`http://localhost:4000/featuredMovie`);
        const json = await resp.json();
        setState({
            title: json.title,
            year: json.year,
            desc: json.plot,
            src: json.poster,
            imdb: `https://www.imdb.com/title/${json.imdb}/`,
        })
    }

    React.useEffect(() => {
        getFeatured()
    }, []);

    return (
        <div id="featured-movie">
            <Card bg={props.bg}>
                <Card.Header>Featured Movie</Card.Header>
                <Card.Body>
                    <Card.Img className="featured-movie-poster" src={src} />
                    <p id="featured-movie-title">{title} ({year})</p>
                    <p id="featured-movie-description">{desc}</p>
                    <Button variant="info" href={imdb} target="_blank">View on IMDb</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Featured;