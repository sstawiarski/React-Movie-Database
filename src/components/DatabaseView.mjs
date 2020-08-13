import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

class DatabaseView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            searchTerm: encodeURI(this.props.searchTerm)
        }
    }

    componentDidMount() {
        try {
            fetch(`http://localhost:4000/movielist/${this.state.searchTerm}`)
            .then(res => res.json())
            .then(json =>{
                this.setState({movies: json});
            });

        }
        catch {
            console.log("error searching movie database");
        }

    }

    render() {
        return (
            <Container id="database-view">
                <Table striped bordered hover>
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
                                <tr key={movie.imdb}>
                                    <td>{movie.imdb}</td>
                                    <td>{movie.title}</td>
                                    <td>{movie.year}</td>
                                    <td>{movie.plot}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default DatabaseView;