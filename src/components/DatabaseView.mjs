import React from 'react';
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';

class DatabaseView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
        }
    }

    render() {
        const searchTerm = encodeURI(this.props.searchTerm);

        if (this.props.searchTerm) {
            try {
                fetch(`http://localhost:4000/movielist/${searchTerm}`)
                    .then(res => res.json())
                    .then(json => {
                        this.setState({ movies: json });
                    });

            }
            catch {
                console.log("error searching movie database");
            }
        }

        return (
            <Container id="database-view">
                {searchTerm ? <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>IMDb ID</th>
                            <th>Title</th>
                            <th>Year</th>
                            <th>Plot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => {
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
}

export default DatabaseView;