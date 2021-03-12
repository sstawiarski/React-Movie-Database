import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

const FeaturedMovieEditor = (props) => {

    const [value, setValue] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        let newMovie;
        fetch(`http://omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&i=${value}`)
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
                    fetch(process.env.REACT_APP_SERVER_ADDR + "/featuredMovie", {
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
        setValue("");
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <Card bg={props.bg} id="featured-movie-edit">
            <Card.Header>Change Featured Movie</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="featuredMovieId">
                        <Form.Control type="text" onChange={handleChange} value={value} placeholder="Enter new IMDb ID..." />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Card.Body>
        </Card>
    );

}

export default FeaturedMovieEditor;