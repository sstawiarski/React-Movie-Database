import React from 'react';
import ReactDOM from 'react-dom';
import Card from 'react-bootstrap/Card';
import { Searchbar } from '../components/Searchbar'
import DatabaseView from '../components/DatabaseView';

const Movies = (props) => {

    const [value, setValue] = React.useState('');

    const handleChange = (text) => {
        setValue(text);
    }

    return (
        <div id="database-view">
            <br />
            <Card bg="light">
                <Searchbar onChange={handleChange} />
            </Card>
            <br />
            <Card bg="light" id="table-view">
                <DatabaseView searchTerm={value} />
            </Card>
        </div>
    );
}

export default Movies;