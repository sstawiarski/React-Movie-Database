import React from 'react';
import ReactDOM from 'react-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import { Searchbar } from './Searchbar.mjs';
import DatabaseView from './DatabaseView.mjs';

class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(text) {
        this.setState({ value: text });
        ReactDOM.render(<DatabaseView key={Date.now()} searchTerm={this.state.value} />, document.getElementById("table-view"));
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