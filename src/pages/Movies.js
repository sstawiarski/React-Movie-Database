import React from 'react';
import ReactDOM from 'react-dom';
import Card from 'react-bootstrap/Card';
import { Searchbar } from '../components/Searchbar'
import DatabaseView from '../components/DatabaseView';

const Movies = (props) => {

    const [value, setValue] = React.useState(null);

    const handleChange = (text) => {
        setValue(text);
        ReactDOM.render(<DatabaseView searchTerm={value} />, document.getElementById("table-view"));
    }

    return (
        <div id="database-view">
            <br />
            <Card bg="light">
                <Searchbar onChange={handleChange} />
            </Card>
            <br />
            <Card bg="light" id="table-view">

            </Card>
        </div>
    );
}

export default Movies;