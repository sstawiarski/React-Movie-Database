import React from 'react';
import ReactDOM from 'react-dom';
import Card from 'react-bootstrap/Card';
import { Searchbar } from '../components/Searchbar'
import DatabaseView from '../components/DatabaseView';

class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(text) {
        this.setState({ value: text }, () => {
            ReactDOM.render(<DatabaseView searchTerm={this.state.value} />, document.getElementById("table-view"))
        });
    }

    render() {
        return (
            <div id="database-view">
                <br />
                <Card bg="light">
                    <Searchbar onChange={this.handleChange} />
                </Card>
                <br />
                <Card bg="light" id="table-view">

                </Card>
            </div>
        );
    }
}

export default Movies;