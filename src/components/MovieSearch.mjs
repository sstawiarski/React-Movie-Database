import React from 'react';
import MovieDetails from './MovieDetails';

class MovieSearch extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (<MovieDetails searchTerm={this.props}/>);
    }
}

export default MovieSearch;