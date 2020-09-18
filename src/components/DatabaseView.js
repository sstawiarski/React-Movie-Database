import React from 'react';
import ReactDOM from 'react-dom';

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';

const DatabaseView = (props) => {

    const [movies, setMovies] = React.useState(null);

    React.useEffect(() => {
        const searchTerm = encodeURI(props.searchTerm);
        if (searchTerm) {
            try {
                fetch(`http://localhost:4000/movielist/${searchTerm}`)
                    .then(res => res.json())
                    .then(json => {
                        if (json.success) {
                            setMovies(json.foundItems);
                        } else {
                            setMovies([]);
                        }
                    });

            }
            catch {
                console.log("error searching movie database");
            }
        }
    }, [props.searchTerm])

    return (
        <Container id="database-view">
            {movies ? <Table id={"results"} striped bordered hover>
                <thead>
                    <tr>
                        <th>IMDb ID</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Plot</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => {
                        return (
                            <tr key={movie.imdb} className="clickable-row" onClick={() => window.location = `details/${movie.imdb}`}>
                                <td>{movie.imdb}</td>
                                <td>{movie.title}</td>
                                <td>{movie.year}</td>
                                <td>{movie.plot}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table> : null}
        </Container>
    );
}

export default DatabaseView;