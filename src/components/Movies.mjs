import React from 'react';
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
    }

    render() {
        return (
            <div id="database-view">
                <br />
                <Card bg="light">
                    <Searchbar onChange={this.handleChange} />
                </Card>
                <br />
                <Card bg="light">
                    <DatabaseView />
                </Card>
            </div>
        );
    }
}

export default Movies;